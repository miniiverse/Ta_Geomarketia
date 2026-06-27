<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class SendOtpRequest extends FormRequest
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
            'email' => [
                'required',
                'email',
                'regex:/@gmail\.com$/i',
                'exists:users,email',
            ],
        ];
    }

    /**
     * Get custom error messages for validation failures.
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Email is required.',
            'email.email'    => 'Please enter a valid email address.',
            'email.regex'    => 'Only Gmail addresses (@gmail.com) are allowed.',
            'email.exists'   => 'No account found with this email address.',
        ];
    }
}