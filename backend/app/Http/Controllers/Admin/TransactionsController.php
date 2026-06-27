<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class TransactionsController extends Controller
{
    /*
     * Retrieves a paginated list of all transactions with optional filters.
     * Available filters: payment status, payment method, and keyword search.
     * Returns order, payment, user, project data along with overall statistics.
     */
    public function index(Request $request)
    {
        $query = Order::with(['payment', 'project', 'user'])
            ->orderByDesc('created_at');

        $totalRevenue = Payment::where('payment_status', 'settlement')
            ->whereHas('order', fn($q) => $q->where('order_status', 'paid'))
            ->sum('gross_amount');

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
            'stats'        => [
                'total'         => Order::count(),
                'paid'          => Order::where('order_status', 'paid')->count(),
                'pending'       => Order::where('order_status', 'pending')->count(),
                'cancelled'     => Order::where('order_status', 'cancelled')->count(),
                'total_revenue' => $totalRevenue,
            ],
        ]);
    }

    /*
     * Retrieves the detail of a single transaction by order_id.
     * Includes payment, project with category, and user relations.
     * Automatically returns 404 if not found.
     */
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

    /*
     * Exports transaction data within a given date range to an Excel file (.xlsx).
     * Builds a styled spreadsheet with headers and zebra-striped rows,
     * then returns it as a direct file download to the browser.
     */
    public function exportExcel(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date'   => 'required|date|after_or_equal:start_date',
        ]);

        $startDate = Carbon::parse($request->start_date)->startOfDay();
        $endDate   = Carbon::parse($request->end_date)->endOfDay();

        $orders = Order::with(['payment', 'project.category', 'user'])
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereHas('payment', function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('payment_time', [$startDate, $endDate]);
                })->orWhere(function ($q) use ($startDate, $endDate) {
                    $q->whereBetween('created_at', [$startDate, $endDate])
                        ->where(function ($q2) {
                            $q2->whereDoesntHave('payment')
                                ->orWhereHas('payment', fn($q3) => $q3->whereNull('payment_time'));
                        });
                });
            })
            ->orderByDesc('created_at')
            ->get();

        $spreadsheet = new Spreadsheet();
        $sheet       = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Transaction Report');

        $sheet->mergeCells('A1:I1');
        $sheet->setCellValue('A1', 'Transaction Report');
        $sheet->getStyle('A1')->applyFromArray([
            'font'      => ['bold' => true, 'size' => 14, 'color' => ['argb' => 'FF1A56DB']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
        ]);
        $sheet->getRowDimension(1)->setRowHeight(28);

        $sheet->mergeCells('A2:I2');
        $startFormatted = Carbon::parse($request->start_date)->locale('en')->isoFormat('MMMM DD, YYYY');
        $endFormatted   = Carbon::parse($request->end_date)->locale('en')->isoFormat('MMMM DD, YYYY');
        $sheet->setCellValue('A2', "Period: {$startFormatted} - {$endFormatted}");
        $sheet->getStyle('A2')->applyFromArray([
            'font'      => ['size' => 10, 'color' => ['argb' => 'FF64748B']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
        ]);
        $sheet->getRowDimension(2)->setRowHeight(20);

        $sheet->getRowDimension(3)->setRowHeight(6);

        $headers = ['No', 'Order ID', 'Customer Name', 'Project / Service', 'Category', 'Payment Status', 'Payment Method', 'Total Price', 'Transaction Date'];
        $cols    = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

        foreach ($headers as $index => $header) {
            $sheet->setCellValue($cols[$index] . '4', $header);
        }

        $sheet->getStyle('A4:I4')->applyFromArray([
            'font' => [
                'bold'  => true,
                'color' => ['argb' => 'FFFFFFFF'],
                'size'  => 11,
            ],
            'fill' => [
                'fillType'   => Fill::FILL_SOLID,
                'startColor' => ['argb' => 'FF1A56DB'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical'   => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color'       => ['argb' => 'FFBFDBFE'],
                ],
            ],
        ]);
        $sheet->getRowDimension(4)->setRowHeight(24);

        $paymentMap = [
            'qris'          => 'QRIS',
            'gopay'         => 'GoPay',
            'shopeepay'     => 'ShopeePay',
            'bank_transfer' => 'Bank Transfer',
            'credit_card'   => 'Credit Card',
            'cstore'        => 'Convenience Store',
            'echannel'      => 'Mandiri Bill',
        ];

        $statusMap = [
            'settlement' => 'Paid',
            'capture'    => 'Paid',
            'paid'       => 'Paid',
            'pending'    => 'Pending',
            'cancel'     => 'Cancelled',
            'cancelled'  => 'Cancelled',
            'expire'     => 'Cancelled',
            'deny'       => 'Cancelled',
        ];

        $rowNum = 5;
        foreach ($orders as $i => $order) {
            $payment       = $order->payment;
            $rawStatus     = $payment?->payment_status ?? $order->order_status ?? '-';
            $paymentStatus = $statusMap[strtolower($rawStatus)] ?? 'Unknown';
            $rawMethod     = $payment?->payment_method ?? null;
            $paymentMethod = $rawMethod
                ? ($paymentMap[strtolower($rawMethod)] ?? strtoupper(str_replace('_', ' ', $rawMethod)))
                : 'Unknown';
            $amount        = (float) ($payment?->gross_amount ?? $order->total_amount ?? 0);
            $date          = $payment?->payment_time ?? $order->created_at;
            $dateFormatted = $date ? Carbon::parse($date)->locale('en')->isoFormat('MMMM DD, YYYY') : '-';

            $sheet->setCellValue("A{$rowNum}", $i + 1);
            $sheet->setCellValue("B{$rowNum}", 'ORDER-' . $order->order_id);
            $sheet->setCellValue("C{$rowNum}", $order->user?->fullname ?? '-');
            $sheet->setCellValue("D{$rowNum}", $order->project?->title ?? '-');
            $sheet->setCellValue("E{$rowNum}", $order->project?->category?->name ?? '-');
            $sheet->setCellValue("F{$rowNum}", $paymentStatus);
            $sheet->setCellValue("G{$rowNum}", $paymentMethod);
            $sheet->setCellValue("H{$rowNum}", $amount);
            $sheet->setCellValue("I{$rowNum}", $dateFormatted);

            $sheet->getStyle("H{$rowNum}")->getNumberFormat()->setFormatCode('"Rp "#,##0');

            $bgColor = $i % 2 === 0 ? 'FFFFFFFF' : 'FFF8FAFF';
            $sheet->getStyle("A{$rowNum}:I{$rowNum}")->applyFromArray([
                'fill' => [
                    'fillType'   => Fill::FILL_SOLID,
                    'startColor' => ['argb' => $bgColor],
                ],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color'       => ['argb' => 'FFE2E8F0'],
                    ],
                ],
            ]);

            $sheet->getStyle("A{$rowNum}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle("F{$rowNum}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle("G{$rowNum}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle("I{$rowNum}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getRowDimension($rowNum)->setRowHeight(20);

            $rowNum++;
        }

        $widths = ['A' => 6, 'B' => 16, 'C' => 24, 'D' => 32, 'E' => 20, 'F' => 16, 'G' => 18, 'H' => 20, 'I' => 18];
        foreach ($widths as $col => $width) {
            $sheet->getColumnDimension($col)->setWidth($width);
        }

        $filename = 'transactions_project_geomarketia_' . $request->start_date . '_to_' . $request->end_date . '.xlsx';
        $writer   = new Xlsx($spreadsheet);

        return response()->streamDownload(function () use ($writer) {
            $writer->save('php://output');
        }, $filename, [
            'Content-Type'        => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Cache-Control'       => 'max-age=0',
        ]);
    }
}
