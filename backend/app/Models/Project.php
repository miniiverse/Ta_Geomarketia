<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\City;
use App\Models\User;

class Project extends Model
{
    protected $primaryKey = 'project_id';

    protected $fillable = [
        'user_id', 'category_id', 'city_id',
        'title', 'description', 'price',
        'total_data', 'project_date', 'api_url', 'thumbnail',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}