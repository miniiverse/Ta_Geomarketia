<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Transaction;

class OrderController extends Controller
{
    /*
     * Creates a new order for the authenticated user.
     * Validates project_id and total_amount, checks for existing orders.
     * Returns the order ID and success message upon creation.
     */
    public function store(Request $request)
    {
        $request->validate([
            'project_id'   => 'required|integer|exists:projects,project_id',
            'total_amount' => 'required|numeric|min:1',
        ]);

        $user = $request->user();

        $alreadyOwned = Order::where('project_id', $request->project_id)
            ->where('order_status', 'paid')
            ->exists();

        if ($alreadyOwned) {
            return response()->json([
                'success' => false,
                'message' => 'This project is already owned by another user.',
            ], 400);
        }

        $existing = Order::where('user_id', $user->user_id)
            ->where('project_id', $request->project_id)
            ->where('order_status', 'pending')
            ->first();

        if ($existing) {
            return response()->json([
                'success'  => true,
                'order_id' => $existing->order_id,
                'message'  => 'Order already exists.',
            ]);
        }

        $order = Order::create([
            'user_id'      => $user->user_id,
            'project_id'   => $request->project_id,
            'order_status' => 'pending',
            'total_amount' => $request->total_amount,
        ]);

        return response()->json([
            'success'  => true,
            'order_id' => $order->order_id,
            'message'  => 'Order created successfully.',
        ], 201);
    }

    /*
     * Retrieves all orders for the authenticated user.
     * If 'all' query parameter is false (default), only shows paid orders.
     */
    public function index(Request $request)
    {
        $query = Order::where('user_id', $request->user()->user_id);
        if (!$request->boolean('all')) {
            $query->where('order_status', 'paid');
        }

        $orders = $query->with([
            'payment',
            'project' => function ($q) {
                $q->select('project_id', 'title', 'category_id', 'city_id', 'total_data', 'price', 'thumbnail')
                    ->with([
                        'category:category_id,name',
                        'city:city_id,name',
                    ]);
            },
        ])
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'orders'  => $orders,
        ]);
    }

    /*
     * Retrieves the detail of a single order by order_id for the authenticated user.
     * Automatically returns 404 if not found or if the order does not belong to the user.
     */
    public function show(Request $request, $id)
    {
        $order = Order::where('order_id', $id)
            ->where('user_id', $request->user()->user_id)
            ->with(['payment', 'project'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'order'   => $order,
        ]);
    }

    /*
     * Cancels an order by order_id for the authenticated user.
     * Only allows cancellation if the order is not paid or already cancelled.
     * If the order has a Midtrans transaction, attempts to cancel it via Midtrans API.
     */
    public function cancel(Request $request, $id)
    {
        $order = Order::where('order_id', $id)
            ->where('user_id', $request->user()->user_id)
            ->firstOrFail();

        if ($order->order_status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'A paid order cannot be cancelled.',
            ], 400);
        }

        if ($order->order_status === 'cancelled') {
            return response()->json([
                'success' => false,
                'message' => 'Order already cancelled.',
            ], 400);
        }

        $payment = Payment::where('order_id', $id)->first();

        $markCancelled = function () use ($order, $payment) {
            $order->update(['order_status' => 'cancelled']);
            $payment?->update([
                'payment_status' => 'cancel',
                'payment_time'   => now(),
            ]);
        };

        if (!$payment || !$payment->midtrans_transaction_id) {
            DB::transaction($markCancelled);

            Log::info("Order #{$id} cancelled (no Midtrans transaction).");

            return response()->json([
                'success' => true,
                'message' => 'Order cancelled successfully.',
            ]);
        }

        Config::$serverKey    = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized  = true;
        Config::$is3ds        = true;

        $midtransId = $payment->midtrans_transaction_id;

        try {
            Transaction::cancel($midtransId);

            Log::info("Midtrans cancel OK: order #{$id} | tx: {$midtransId}");

            DB::transaction($markCancelled);

            return response()->json([
                'success' => true,
                'message' => 'Order cancelled successfully.',
            ]);
        } catch (\Throwable $e) {
            $message = $e->getMessage();
            Log::warning("Midtrans cancel failed for order #{$id}: {$message}");


            if (str_contains($message, "doesn't exist") || str_contains($message, '404')) {
                DB::transaction($markCancelled);

                Log::info("Order #{$id} cancelled (Midtrans 404 - tx never created).");

                return response()->json([
                    'success' => true,
                    'message' => 'Order cancelled successfully.',
                ]);
            }

            if (str_contains($message, '500') || str_contains($message, 'unexpected issues')) {
                Log::warning("Midtrans 500 for order #{$id}, retrying in 2s...");
                sleep(2);

                try {
                    Transaction::cancel($midtransId);

                    Log::info("Midtrans cancel OK (retry): order #{$id} | tx: {$midtransId}");

                    DB::transaction($markCancelled);

                    return response()->json([
                        'success' => true,
                        'message' => 'Order cancelled successfully.',
                    ]);
                } catch (\Throwable $retryE) {
                    $retryMsg = $retryE->getMessage();
                    Log::warning("Midtrans cancel retry also failed for order #{$id}: {$retryMsg}");

                    if (
                        str_contains($retryMsg, "doesn't exist") ||
                        str_contains($retryMsg, '404')           ||
                        str_contains($retryMsg, '500')           ||
                        str_contains($retryMsg, 'unexpected issues')
                    ) {
                        DB::transaction($markCancelled);

                        Log::info("Order #{$id} cancelled despite Midtrans error (no actual payment).");

                        return response()->json([
                            'success' => true,
                            'message' => 'Order cancelled successfully.',
                        ]);
                    }
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Tidak bisa membatalkan pesanan: ' . $message,
            ], 400);
        }
    }
}
