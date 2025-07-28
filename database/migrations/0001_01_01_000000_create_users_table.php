<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::create('roles',function(Blueprint $table){
            $table->id();
            $table->string('role_name');
            $table->timestamps();
        });

        Schema::create('specialization',function(Blueprint $table){
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone_number');
            $table->string('staff_id');
            $table->string('email')->unique();
            $table->string('dob');
            $table->timestamp('email_verified_at')->nullable();
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');        
            $table->string('password');
            $table->string('profile_pic')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('doctor_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('medical_registration_number');
            $table->string('registration_council');
            $table->string('registration_state');
            $table->year('year_of_registration');
            $table->integer('years_of_experience')->nullable();
            $table->text('hospital_affiliations')->nullable();
            $table->foreignId('specialization_id')->nullable()->constrained('specialization')->onDelete('set null');
            $table->string('license_document')->nullable();
            $table->string('degree');
            $table->string('document_path')->nullable();
            $table->timestamps();
        });
        

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('doctor_profiles');
        Schema::dropIfExists('users');
        Schema::dropIfExists('specialization');
        Schema::dropIfExists('roles');
    }
};
