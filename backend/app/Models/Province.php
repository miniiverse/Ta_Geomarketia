<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'province_id';

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Get the cities for the province.
     */
    public function cities()
    {
        return $this->hasMany(City::class, 'province_id', 'province_id');
    }
}