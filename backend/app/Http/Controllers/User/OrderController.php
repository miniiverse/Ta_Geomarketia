<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
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

    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->user_id)
                       ->with([
                           'payment',
                           'project' => function ($q) {
                               $q->select('project_id', 'title', 'category_id', 'city_id', 'total_data', 'price', 'thumbnail') // ← tambah thumbnail
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

    public function cancel(Request $request, $id)
    {
        $order = Order::where('order_id', $id)
                      ->where('user_id', $request->user()->user_id)
                      ->where('order_status', 'paid')
                      ->doesntExist();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'A paid order cannot be cancelled.',
            ], 400);
        }

        Order::where('order_id', $id)
             ->where('user_id', $request->user()->user_id)
             ->update(['order_status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Order cancelled successfully.',
        ]);
    }
}