<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
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
            'email'    => ['required', 'email', 'regex:/@gmail\.com$/i', 'exists:users,email'],
            'otp'      => ['required', 'string', 'size:6'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    /**
     * Get custom error messages for validation failures.
     */
    public function messages(): array
    {
        return [
            'email.required'     => 'Email is required.',
            'email.regex'        => 'Only Gmail addresses are allowed.',
            'email.exists'       => 'No account found with this email address.',
            'otp.required'       => 'OTP code is required.',
            'otp.size'           => 'OTP must be exactly 6 digits.',
            'password.required'  => 'Password is required.',
            'password.min'       => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Passwords do not match.',
        ];
    }
}