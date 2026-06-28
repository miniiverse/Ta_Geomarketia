<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    private const PAID_PAYMENT_STATUSES = ['settlement', 'capture'];

    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'order_id';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'project_id',
        'order_status',
        'total_amount',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'total_amount' => 'decimal:2',
        'created_at'   => 'datetime',
    ];

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::creating(function ($order) {
            $order->created_at = now();
        });
    }

    /**
     * Get the user that owns the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * Get the project that owns the order.
     */
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'project_id');
    }

    /**
     * Get the payment associated with the order.
     */
    public function payment()
    {
        return $this->hasOne(Payment::class, 'order_id', 'order_id');
    }

    /**
     * Scope orders that represent a completed purchase.
     */
    public function scopeCompletedPurchase($query)
    {
        return $query
            ->where('order_status', 'paid')
            ->whereHas('payment', function ($q) {
                $q->whereIn('payment_status', self::PAID_PAYMENT_STATUSES)
                    ->whereNotNull('payment_time');
            });
    }
}
