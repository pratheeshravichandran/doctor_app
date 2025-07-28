<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'staff_id',
        'dob',
        'gender',
        'password',
        'role_id',
        'profile_pic'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'dob' => 'date',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }

    public function doctorProfile()
    {
        return $this->hasOne(DoctorProfile::class);
    }

    public function qualifications()
    {
        return $this->hasMany(EducationalQualification::class);
    }

    public function practiceInfo()
    {
        return $this->hasOne(PracticeInfo::class);
    }
}
