<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    /**
     * The table associated with the model.
     */
    protected $table      = 'users';
    
    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'user_id';
    
    /**
     * Indicates if the model should be timestamped.
     */
    public    $timestamps = true;        
    
    /**
     * The name of the "updated at" column.
     */
    const UPDATED_AT      = 'updated_at';

    /**
     * The name of the "created at" column.
     */
    const CREATED_AT      = 'created_at';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'role_id', 'fullname', 'username',
        'email', 'password', 'profile_photo',
    ];

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = ['password'];

    /**
     * Get the role that owns the user.
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }
}