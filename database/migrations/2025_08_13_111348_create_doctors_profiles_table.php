<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doctors_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('medical_registration_number');
            $table->string('registration_council');
            $table->string('registration_state');
            $table->year('year_of_registration');
            $table->integer('years_of_experience')->nullable();
            $table->json('educational_qualifications')->nullable();
            $table->json('specialization')->nullable();
            $table->json('previous_hospital_affiliations')->nullable();
            $table->string('license_document')->nullable();
            $table->string('degree');
            $table->string('document_path')->nullable();
            $table->string('aadhaar_number')->nullable();
            $table->string('pan_card_number')->nullable();
            $table->string('aadhaar_card_upload')->nullable();
            $table->string('pan_card_upload')->nullable();
            $table->string('account_holder_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('ifsc_code')->nullable();
            $table->string('branch_name')->nullable();
            $table->text('practice_address')->nullable();
            $table->string('consultation_hours')->nullable();
            $table->decimal('consultation_fee', 10, 2)->nullable();
            $table->json('consultation_days')->nullable();
            $table->boolean('telemedicine_available')->default(false);
            $table->string('preferred_languages')->nullable();
            $table->string('alternate_contact_number')->nullable();
            $table->string('alternate_email_address')->nullable();
            $table->json('linked_professional_profiles')->nullable();
            $table->json('medical_association_memberships')->nullable();
            $table->json('awards_and_recognitions')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('doctors_profiles');
    }
};
