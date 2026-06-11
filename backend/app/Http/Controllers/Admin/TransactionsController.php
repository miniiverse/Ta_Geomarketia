<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['payment', 'project', 'user'])
            ->orderByDesc('created_at');

        if ($request->filled('status')) {
            $status = $request->status;
            $query->whereHas('payment', fn($q) => $q->where('payment_status', $status));
        }
        if ($request->filled('payment_method')) {
            $query->whereHas('payment', fn($q) => $q->where('payment_method', $request->payment_method));
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('project', fn($q2) => $q2->where('title', 'like', "%{$search}%"))
                  ->orWhereHas('payment', fn($q2) => $q2->where('midtrans_transaction_id', 'like', "%{$search}%"))
                  ->orWhere('order_id', 'like', "%{$search}%");
            });
        }

        $orders = $query->paginate($request->get('per_page', 10));

        $data = $orders->map(function ($order) {
            return [
                'order_id'                => $order->order_id,
                'order_status'            => $order->order_status,
                'total_amount'            => $order->total_amount,
                'created_at'              => $order->created_at,

                'project_id'              => $order->project_id,
                'project_title'           => $order->project?->title ?? '-',
                'project_category'        => $order->project?->category?->name ?? '-',

                'user_id'                 => $order->user_id,
                'user_name'               => $order->user?->fullname ?? '-',
                'user_email'              => $order->user?->email ?? '-',

                'payment_id'              => $order->payment?->payment_id,
                'payment_status'          => $order->payment?->payment_status,
                'payment_method'          => $order->payment?->payment_method,
                'gross_amount'            => $order->payment?->gross_amount,
                'payment_time'            => $order->payment?->payment_time,
                'midtrans_transaction_id' => $order->payment?->midtrans_transaction_id,
            ];
        });

        return response()->json([
            'success'      => true,
            'data'         => $data,
            'total'        => $orders->total(),
            'per_page'     => $orders->perPage(),
            'current_page' => $orders->currentPage(),
            'last_page'    => $orders->lastPage(),

            'stats' => [
                'total'         => Order::count(),
                'paid'          => Order::where('order_status', 'paid')->count(),
                'pending'       => Order::where('order_status', 'pending')->count(),
                'cancelled'     => Order::where('order_status', 'cancelled')->count(),
                'total_revenue' => Payment::where('payment_status', 'settlement')->sum('gross_amount'),
            ],
        ]);
    }

    public function show($id)
    {
        $order = Order::where('order_id', $id)
            ->with(['payment', 'project', 'user'])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data'    => [
                'order_id'                => $order->order_id,
                'order_status'            => $order->order_status,
                'total_amount'            => $order->total_amount,
                'created_at'              => $order->created_at,

                'project_id'              => $order->project_id,
                'project_title'           => $order->project?->title ?? '-',
                'project_category'        => $order->project?->category?->name ?? '-',
                'project_price'           => $order->project?->price ?? 0,

                'user_id'                 => $order->user_id,
                'user_name'               => $order->user?->fullname ?? '-',
                'user_email'              => $order->user?->email ?? '-',

                'payment_id'              => $order->payment?->payment_id,
                'payment_status'          => $order->payment?->payment_status,
                'payment_method'          => $order->payment?->payment_method,
                'gross_amount'            => $order->payment?->gross_amount,
                'payment_time'            => $order->payment?->payment_time,
                'midtrans_transaction_id' => $order->payment?->midtrans_transaction_id,
            ],
        ]);
    }
}