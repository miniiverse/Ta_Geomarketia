<?php

namespace App\Http\Controllers\User;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;
use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    public function __construct()
    {
        Config::$serverKey    = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized  = true;
        Config::$is3ds        = true;
    }

    private function midtransBase(): string
    {
        return Config::$isProduction
            ? 'https://api.midtrans.com/v2'
            : 'https://api.sandbox.midtrans.com/v2';
    }

    private function midtransAuth(): string
    {
        return base64_encode(config('midtrans.server_key') . ':');
    }


    private function cancelOldMidtransTransactionIfPending(?string $oldMidtransOrderId): void
    {
        if (!$oldMidtransOrderId) {
            return;
        }

        $base = $this->midtransBase();
        $auth = $this->midtransAuth();

        try {
            $statusRes = Http::withHeaders([
                'Accept'        => 'application/json',
                'Authorization' => 'Basic ' . $auth,
            ])->get("{$base}/{$oldMidtransOrderId}/status");

            $statusData     = $statusRes->json();
            $midtransStatus = $statusData['transaction_status'] ?? null;

            Log::info("createSnapToken: cek transaksi lama {$oldMidtransOrderId} → status = {$midtransStatus}");

            if (!in_array($midtransStatus, ['pending', 'authorize'])) {
                return;
            }

            $cancelRes = Http::withHeaders([
                'Accept'        => 'application/json',
                'Authorization' => 'Basic ' . $auth,
            ])->post("{$base}/{$oldMidtransOrderId}/cancel");

            if ($cancelRes->successful()) {
                Log::info("createSnapToken: transaksi lama {$oldMidtransOrderId} berhasil di-cancel.");
                return;
            }

            $cancelBody   = $cancelRes->json();
            $statusCode   = $cancelBody['status_code'] ?? null;

            Log::warning("createSnapToken: gagal cancel transaksi lama {$oldMidtransOrderId}: " . json_encode($cancelBody));
            if ($statusCode === '500' || str_contains($cancelBody['status_message'] ?? '', 'unexpected issues')) {
                Log::info("createSnapToken: retry cancel {$oldMidtransOrderId} dalam 2 detik...");
                sleep(2);

                $retryRes = Http::withHeaders([
                    'Accept'        => 'application/json',
                    'Authorization' => 'Basic ' . $auth,
                ])->post("{$base}/{$oldMidtransOrderId}/cancel");

                if ($retryRes->successful()) {
                    Log::info("createSnapToken: retry cancel {$oldMidtransOrderId} berhasil.");
                } else {
                    Log::warning("createSnapToken: retry cancel {$oldMidtransOrderId} tetap gagal: " . json_encode($retryRes->json()));
                }
            }

        } catch (\Throwable $e) {
            Log::warning("createSnapToken: error saat cek/cancel transaksi lama {$oldMidtransOrderId}: " . $e->getMessage());
        }
    }

    public function createSnapToken(Request $request)
    {
        $request->validate([
            'order_id'     => 'required|integer|exists:orders,order_id',
            'project_id'   => 'required|integer|exists:projects,project_id',
            'total_amount' => 'required|numeric|min:1',
        ]);

        $user    = Auth::user();
        $project = Project::where('project_id', $request->project_id)->firstOrFail();
        $order   = Order::where('order_id', $request->order_id)
                        ->where('user_id', $user->user_id)
                        ->firstOrFail();

        if ($order->order_status === 'paid') {
            return response()->json(['success' => false, 'message' => 'Order ini sudah dibayar.'], 400);
        }

        $existingPayment    = Payment::where('order_id', $order->order_id)->first();
        $oldMidtransOrderId = $existingPayment?->midtrans_transaction_id;
        $this->cancelOldMidtransTransactionIfPending($oldMidtransOrderId);

        DB::beginTransaction();
        try {
            $order->update([
                'order_status' => 'pending',
                'total_amount' => $request->total_amount,
            ]);

            Payment::updateOrCreate(
                ['order_id' => $order->order_id],
                [
                    'payment_status'          => 'pending',
                    'gross_amount'            => $request->total_amount,
                    'midtrans_transaction_id' => null,
                    'payment_method'          => null,
                    'payment_time'            => null,
                ]
            );

            $midtransOrderId = 'ORDER-' . $order->order_id . '-' . time();
            $tax             = (int) $request->total_amount - (int) $project->price;

            $snapToken = Snap::getSnapToken([
                'transaction_details' => [
                    'order_id'     => $midtransOrderId,
                    'gross_amount' => (int) $request->total_amount,
                ],
                'customer_details' => [
                    'first_name' => $user->fullname,
                    'email'      => $user->email,
                ],
                'item_details' => [
                    [
                        'id'       => (string) $project->project_id,
                        'price'    => (int) $project->price,
                        'quantity' => 1,
                        'name'     => $project->title,
                        'category' => 'Geospatial',
                    ],
                    ...($tax > 0 ? [[
                        'id'       => 'TAX',
                        'price'    => $tax,
                        'quantity' => 1,
                        'name'     => 'Tax & Processing Fee',
                    ]] : []),
                ],
            ]);

            Payment::where('order_id', $order->order_id)
                   ->update(['midtrans_transaction_id' => $midtransOrderId]);

            DB::commit();

            Log::info("createSnapToken OK: order #{$order->order_id} | tx: {$midtransOrderId}");

            return response()->json([
                'success'    => true,
                'snap_token' => $snapToken,
                'order_id'   => $order->order_id,
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error('createSnapToken error: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function webhook(Request $request)
    {
        try {
            $notification = new Notification();

            $transactionStatus = $notification->transaction_status;
            $fraudStatus       = $notification->fraud_status ?? null;
            $midtransOrderId   = $notification->order_id;
            $transactionId     = $notification->transaction_id;
            $paymentType       = $notification->payment_type;
            $grossAmount       = $notification->gross_amount;

            preg_match('/ORDER-(\d+)-/', $midtransOrderId, $matches);
            $orderId = $matches[1] ?? null;

            if (!$orderId) {
                Log::warning('Webhook: tidak bisa parse order_id dari: ' . $midtransOrderId);
                return response()->json(['message' => 'OK']);
            }

            $payment = Payment::where('order_id', $orderId)->first();
            $order   = Order::where('order_id', $orderId)->first();

            if (!$payment || !$order) {
                Log::warning('Webhook: order/payment tidak ditemukan untuk order_id: ' . $orderId);
                return response()->json(['message' => 'OK']);
            }

            if ($payment->midtrans_transaction_id
                && $payment->midtrans_transaction_id !== $midtransOrderId
                && $payment->payment_status !== 'pending') {
                Log::info("Webhook diabaikan: order #{$orderId} sudah punya transaksi lain ({$payment->midtrans_transaction_id}), notif dari {$midtransOrderId} di-skip.");
                return response()->json(['message' => 'OK']);
            }

            $paymentStatus = match (true) {
                $transactionStatus === 'capture' && $fraudStatus === 'accept' => 'settlement',
                $transactionStatus === 'settlement'                           => 'settlement',
                $transactionStatus === 'pending'                              => 'pending',
                $transactionStatus === 'deny'                                 => 'deny',
                $transactionStatus === 'expire'                               => 'expire',
                $transactionStatus === 'cancel'                               => 'cancel',
                default                                                       => 'pending',
            };

            $orderStatus = match ($paymentStatus) {
                'settlement' => 'paid',
                'cancel'     => 'cancelled',
                'expire'     => 'cancelled',
                default      => 'pending',
            };

            DB::transaction(function () use ($order, $payment, $paymentStatus, $orderStatus, $paymentType, $grossAmount, $midtransOrderId) {
                $order->update(['order_status' => $orderStatus]);
                $payment->update([
                    'payment_status'          => $paymentStatus,
                    'midtrans_transaction_id' => $midtransOrderId,
                    'payment_method'          => $paymentType,
                    'gross_amount'            => $grossAmount,
                    'payment_time'            => $paymentStatus === 'settlement' ? now() : $payment->payment_time,
                ]);
            });

            Log::info("Webhook OK: order #{$order->order_id} → {$orderStatus} | payment → {$paymentStatus}");

            return response()->json(['message' => 'OK']);

        } catch (\Throwable $e) {
            Log::error('Webhook error: ' . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function status(Request $request, $orderId)
    {
        $order = Order::where('order_id', $orderId)
                      ->where('user_id', $request->user()->user_id)
                      ->with('payment')
                      ->firstOrFail();

        return response()->json([
            'success'                 => true,
            'order_id'                => $order->order_id,
            'project_id'              => $order->project_id,
            'order_status'            => $order->order_status,
            'total_amount'            => $order->total_amount,
            'payment_status'          => $order->payment?->payment_status,
            'payment_method'          => $order->payment?->payment_method,
            'midtrans_transaction_id' => $order->payment?->midtrans_transaction_id,
            'payment_time'            => $order->payment?->payment_time,
        ]);
    }
}