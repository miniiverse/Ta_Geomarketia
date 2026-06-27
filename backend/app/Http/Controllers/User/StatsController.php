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
            ->where('user_id', $userId)
            ->where('order_status', 'paid')
            ->distinct('project_id')
            ->count('project_id');

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