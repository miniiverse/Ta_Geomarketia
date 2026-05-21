<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifyOtpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'regex:/@gmail\.com$/i'],
            'otp'   => ['required', 'string', 'size:6'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Email is required.',
            'email.regex'    => 'Only Gmail addresses are allowed.',
            'otp.required'   => 'OTP code is required.',
            'otp.size'       => 'OTP must be exactly 6 digits.',
        ];
    }
}