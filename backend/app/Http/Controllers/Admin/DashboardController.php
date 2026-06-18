<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    private const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    private const SOLD_PAYMENT_STATUSES = ['settlement', 'capture'];

    public function monthlyIncome(Request $request)
    {
        $orders = Order::with('payment')
            ->where('order_status', 'paid')
            ->whereHas('payment', function ($q) {
                $q->whereIn('payment_status', self::SOLD_PAYMENT_STATUSES)
                    ->whereNotNull('payment_time');
            })
            ->get();

        $grouped = [];

        foreach ($orders as $order) {
            $payment = $order->payment;
            if (!$payment || !$payment->payment_time) {
                continue;
            }

            $date = \Carbon\Carbon::parse($payment->payment_time);
            $year = (int) $date->year;
            $monthIndex = $date->month - 1;

            if (!isset($grouped[$year])) {
                $grouped[$year] = array_fill(0, 12, 0);
            }

            $grouped[$year][$monthIndex] += (float) ($payment->gross_amount ?? 0);
        }

        if (empty($grouped)) {
            $grouped[(int) now()->year] = array_fill(0, 12, 0);
        }

        $data = [];
        foreach ($grouped as $year => $amounts) {
            $data[$year] = [];
            foreach ($amounts as $i => $amount) {
                $data[$year][] = ['month' => self::MONTHS[$i], 'amount' => $amount];
            }
        }

        ksort($data);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function categorySales(Request $request)
    {
        $orders = Order::with('project.category')
            ->with('payment')
            ->where('order_status', 'paid')
            ->whereHas('payment', function ($q) {
                $q->whereIn('payment_status', self::SOLD_PAYMENT_STATUSES)
                    ->whereNotNull('payment_time');
            })
            ->get();

        $grouped = [];

        foreach ($orders as $order) {
            $payment = $order->payment;
            if (!$payment || !$payment->payment_time) {
                continue;
            }

            $year = (int) \Carbon\Carbon::parse($payment->payment_time)->year;
            $categoryId = $order->project?->category_id ?? 0;
            $categoryName = $order->project?->category?->name ?? 'Uncategorized';

            if (!isset($grouped[$year])) {
                $grouped[$year] = [];
            }
            if (!isset($grouped[$year][$categoryId])) {
                $grouped[$year][$categoryId] = [
                    'category_id' => $categoryId,
                    'category_name' => $categoryName,
                    'total_sold' => 0,
                    'total_revenue' => 0,
                ];
            }

            $grouped[$year][$categoryId]['total_sold'] += 1;
            $grouped[$year][$categoryId]['total_revenue'] += (float) ($payment->gross_amount ?? 0);
        }

        $data = [];
        foreach ($grouped as $year => $categories) {
            $data[$year] = array_values($categories);
        }

        if (empty($data)) {
            $data[(int) now()->year] = [];
        }

        ksort($data);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function monthlySalesSummary(Request $request)
    {
        $orders = Order::with('payment')
            ->where('order_status', 'paid')
            ->whereHas('payment', function ($q) {
                $q->whereIn('payment_status', self::SOLD_PAYMENT_STATUSES)
                    ->whereNotNull('payment_time');
            })
            ->get();

        $grouped = [];

        foreach ($orders as $order) {
            $payment = $order->payment;
            if (!$payment || !$payment->payment_time) {
                continue;
            }

            $date = \Carbon\Carbon::parse($payment->payment_time);
            $year = (int) $date->year;
            $monthIndex = $date->month - 1;

            if (!isset($grouped[$year])) {
                $grouped[$year] = array_fill(0, 12, [
                    'amount' => 0,
                    'products_sold' => 0,
                    'transactions' => 0,
                ]);
            }

            $grouped[$year][$monthIndex]['amount'] += (float) ($payment->gross_amount ?? 0);
            $grouped[$year][$monthIndex]['products_sold'] += 1;
            $grouped[$year][$monthIndex]['transactions'] += 1;
        }

        if (empty($grouped)) {
            $grouped[(int) now()->year] = array_fill(0, 12, [
                'amount' => 0,
                'products_sold' => 0,
                'transactions' => 0,
            ]);
        }

        $data = [];
        foreach ($grouped as $year => $months) {
            $data[$year] = [];
            foreach ($months as $i => $val) {
                $data[$year][] = [
                    'month' => self::MONTHS[$i],
                    'amount' => $val['amount'],
                    'products_sold' => $val['products_sold'],
                    'transactions' => $val['transactions'],
                ];
            }
        }

        ksort($data);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function topSellingServices(Request $request)
    {
        $orders = Order::with('project.category')
            ->with('payment')
            ->where('order_status', 'paid')
            ->whereHas('payment', function ($q) {
                $q->whereIn('payment_status', self::SOLD_PAYMENT_STATUSES)
                    ->whereNotNull('payment_time');
            })
            ->get();

        $grouped = [];

        foreach ($orders as $order) {
            $payment = $order->payment;
            if (!$payment || !$payment->payment_time) {
                continue;
            }

            $categoryId   = $order->project?->category_id ?? 0;
            $categoryName = $order->project?->category?->name ?? 'Uncategorized';

            if (!isset($grouped[$categoryId])) {
                $grouped[$categoryId] = [
                    'category'      => $categoryName,
                    'sold'          => 0,
                    'revenue'       => 0,
                ];
            }

            $grouped[$categoryId]['sold']    += 1;
            $grouped[$categoryId]['revenue'] += (float) ($payment->gross_amount ?? 0);
        }

        $data = array_values($grouped);

        usort($data, function ($a, $b) {
            $soldCompare = $b['sold'] <=> $a['sold'];
            return $soldCompare !== 0
                ? $soldCompare
                : $b['revenue'] <=> $a['revenue'];
        });

        $data = array_slice($data, 0, 5);

        return response()->json([
            'success' => true,
            'data'    => $data,
        ]);
    }
}
