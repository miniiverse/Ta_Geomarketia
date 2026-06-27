<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'payment_id';
    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'order_id',
        'midtrans_transaction_id',
        'payment_method',
        'payment_status',
        'gross_amount',
        'payment_time',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'gross_amount' => 'float',
        'payment_time' => 'datetime',
    ];

    /**
     * Get the order that owns the payment.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }
}