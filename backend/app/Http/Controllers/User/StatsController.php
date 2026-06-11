<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function index()
    {
        $totalProjects = DB::table('orders')
            ->distinct('project_id')
            ->count('project_id');

        $totalTransactions = DB::table('payments')
            ->where('payment_status', 'settlement')
            ->count();

        return response()->json([
            'totalProjects'     => $totalProjects,
            'totalTransactions' => $totalTransactions,
        ]);
    }
}