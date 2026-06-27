<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifyOtpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'regex:/@gmail\.com$/i'],
            'otp'   => ['required', 'string', 'size:6'],
        ];
    }

    /**
     * Get custom error messages for validation failures.
     */
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