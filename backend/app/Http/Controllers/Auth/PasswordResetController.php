<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SendOtpRequest;
use App\Http\Requests\Auth\VerifyOtpRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\PasswordResetOtp;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;

class PasswordResetController extends Controller
{
    private const OTP_EXPIRE_MINUTES = 10;

    /*
     * Step 1 — Sends an OTP to the user's email.
     * OTP is hashed with bcrypt before being saved to the database.
     * Rate limited to a maximum of 3 requests per 10 minutes per IP.
     */
    public function sendOtp(SendOtpRequest $request)
    {
        $key = 'otp-send:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);

            return response()->json([
                'success' => false,
                'message' => "Too many attempts. Please try again in {$seconds} seconds.",
            ], 429);
        }

        RateLimiter::hit($key, 600);

        $email = $request->email;

        $otpPlain = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        PasswordResetOtp::where('email', $email)->delete();

        PasswordResetOtp::create([
            'email'      => $email,
            'otp'        => Hash::make($otpPlain),
            'expires_at' => Carbon::now()->addMinutes(self::OTP_EXPIRE_MINUTES),
        ]);

        $html = "
<div style='font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;'>
    <div style='max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; padding: 40px;'>

        <h2 style='color: #16a34a; text-align: center; margin-bottom: 10px;'>
            Geomarketia Password Reset
        </h2>

        <p style='font-size: 16px; color: #333;'>
            Hello,
        </p>

        <p style='font-size: 16px; color: #333; line-height: 1.6;'>
            We received a request to reset your Geomarketia account password.
        </p>

        <p style='font-size: 16px; color: #333; line-height: 1.6;'>
            Please use the verification code below to continue:
        </p>

        <div style='text-align: center; margin: 30px 0;'>
            <span style='display: inline-block;
                         background-color: #16a34a;
                         color: white;
                         font-size: 32px;
                         letter-spacing: 8px;
                         padding: 18px 32px;
                         border-radius: 10px;
                         font-weight: bold;'>
                {$otpPlain}
            </span>
        </div>

        <p style='font-size: 15px; color: #555; line-height: 1.6;'>
            This verification code will expire in <strong>" . self::OTP_EXPIRE_MINUTES . " minutes</strong>.
        </p>

        <p style='font-size: 15px; color: #555; line-height: 1.6;'>
            If you did not request a password reset, please ignore this email.
        </p>

        <hr style='margin: 30px 0; border: none; border-top: 1px solid #ddd;'>

        <p style='font-size: 14px; color: #999; text-align: center;'>
            © " . date('Y') . " Geomarketia. All rights reserved.
        </p>

    </div>
</div>
";

        Mail::html($html, function ($message) use ($email) {
            $message->to($email)
                ->subject('Geomarketia - Password Reset OTP');
        });

        return response()->json([
            'success' => true,
            'message' => 'OTP has been sent to your email. Please check your inbox.',
        ]);
    }

    /*
     * Step 2 — Verifies the OTP.
     * Only checks OTP validity without resetting the password immediately.
     * Frontend stores email and OTP to be submitted in step 3.
     */
    public function verifyOtp(VerifyOtpRequest $request)
    {
        $record = PasswordResetOtp::where('email', $request->email)->latest()->first();

        if (! $record) {
            return response()->json([
                'success' => false,
                'message' => 'No OTP found for this email. Please request a new one.',
            ], 404);
        }

        if ($record->isExpired()) {
            $record->delete();
            return response()->json([
                'success' => false,
                'message' => 'OTP has expired. Please request a new one.',
            ], 422);
        }

        if (! Hash::check($request->otp, $record->otp)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OTP code. Please try again.',
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'OTP verified. You may now reset your password.',
        ]);
    }

    /*
     * Step 3 — Resets the user's password.
     * OTP is re-verified here for security, not solely trusting the frontend.
     * All active tokens are deleted to force logout across all sessions.
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $record = PasswordResetOtp::where('email', $request->email)->latest()->first();

        if (! $record) {
            return response()->json([
                'success' => false,
                'message' => 'No OTP found. Please restart the reset process.',
            ], 404);
        }

        if ($record->isExpired()) {
            $record->delete();
            return response()->json([
                'success' => false,
                'message' => 'OTP has expired. Please request a new one.',
            ], 422);
        }

        if (! Hash::check($request->otp, $record->otp)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OTP code. Please restart the reset process.',
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        $user->tokens()->delete();

        $record->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password has been reset successfully. Please log in with your new password.',
        ]);
    }
}
