<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\City;
use App\Models\User;

class Project extends Model
{
    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'project_id';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id', 'category_id', 'city_id',
        'title', 'description', 'price',
        'total_data', 'project_date', 'api_url', 'thumbnail',
    ];

    /**
     * Get the category that owns the project.
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Get the city that owns the project.
     */
    public function city()
    {
        return $this->belongsTo(City::class, 'city_id');
    }

    /**
     * Get the user that owns the project.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}