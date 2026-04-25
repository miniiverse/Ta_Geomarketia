<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $primaryKey = 'city_id';
    public $timestamps = false;

    protected $fillable = [
        'province_id',
        'name',
    ];
}