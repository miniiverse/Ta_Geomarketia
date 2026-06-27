<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class PasswordResetOtp extends Model
{
    /**
     * The primary key associated with the table.
     */
    protected $fillable = ['email', 'otp', 'expires_at'];

    /**
     * Indicates if the model should be timestamped.
     */
    protected $casts = [
        'expires_at' => 'datetime',
    ];

    /**
     * Indicates if the model should be timestamped.
     */
    public function isExpired(): bool
    {
        return Carbon::now()->isAfter($this->expires_at);
    }
}