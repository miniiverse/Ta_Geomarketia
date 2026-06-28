<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    /**
     * Retrieves the total number of unique projects and total transactions for the authenticated user.
     * Returns a JSON response with the counts.
     */
    public function index()
    {
        $userId = Auth::user()->user_id;
        $totalProjects = DB::table('orders')
            ->join('payments', 'payments.order_id', '=', 'orders.order_id')
            ->where('orders.user_id', $userId)
            ->where('orders.order_status', 'paid')
            ->whereIn('payments.payment_status', ['settlement', 'capture'])
            ->whereNotNull('payments.payment_time')
            ->distinct('orders.project_id')
            ->count('orders.project_id');

        $totalTransactions = DB::table('payments')
            ->join('orders', 'payments.order_id', '=', 'orders.order_id')
            ->where('orders.user_id', $userId)
            ->count();

        return response()->json([
            'totalProjects'     => $totalProjects,
            'totalTransactions' => $totalTransactions,
        ]);
    }
}
