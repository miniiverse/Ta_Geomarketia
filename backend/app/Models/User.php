<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $table      = 'users';
    protected $primaryKey = 'user_id';
    public    $timestamps = true;        
    const UPDATED_AT      = 'updated_at';
    const CREATED_AT      = 'created_at';

    protected $fillable = [
        'role_id', 'fullname', 'username',
        'email', 'password', 'profile_photo',
    ];

    protected $hidden = ['password'];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }
}