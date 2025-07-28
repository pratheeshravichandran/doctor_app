<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function getMetadata(): JsonResponse
    {
        try {
            $roles = Role::where('role_name', '!=', 'Admin')->get(['id', 'role_name']);
            $genders = ['Male', 'Female', 'Other'];

            return response()->json([
                'genders' => $genders,
                'roles' => $roles,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to retrieve metadata', 'details' => $e->getMessage()], 500);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'gender' => 'required_if:role,3,4|in:Male,Female,Other',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'required_if:role,3,4|string|unique:users,phone_number',
            'password' => 'required|string|min:6',
            'role' => 'required|exists:roles,id|not_in:1',
            'roll_no' => 'nullable|required_if:role,4|unique:users,roll_no|exclude_if:role,!4',
            'staff_id' => 'required_if:role,3|exclude_if:role,!3|nullable|unique:users,staff_id',
            'dob' => 'required_if:role,3,4|date',
            'profile_pic' => 'required_if:role,3,4|image|mimes:jpeg,png,jpg,gif,bmp,svg,webp,heic,heif,tiff',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $verification = Verification::where('verification_token', $request->input('verification_token'))
                ->orderBy('created_at', 'desc')
                ->first();

            if (!$verification) {
                return response()->json(['error' => 'Invalid verification token'], 400);
            }

            if ($verification->phone_number !== $request->phone_number) {
                return response()->json(['error' => 'Phone number Mismatch'], 400);
            }

            // if ($verification->email !== $request->email) {
            //     return response()->json(['error' => 'Email Mismatch'], 400);
            // }

            if ($verification->phone_verified == false) {
                return response()->json(['error' => 'Please verify your phone number before signing in'], 400);
            }

            // if ($verification->email_verified == false) {
            //     return response()->json(['error' => 'Please verify your email before signing in'], 400);
            // }


            $profilePicPath = $request->hasFile('profile_pic')
                ? $this->fileService->upload($request->file('profile_pic'), 'users', 'profile_pics')['file_path']
                : null;

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'gender' => $request->gender,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'staff_id' => $request->staff_id,
                'dob' => $request->dob,
                'profile_pic' => $profilePicPath,
            ]);

            DB::commit();

            return response()->json([
                'user_id' => $user->id,
                'message' => 'User Registered Successfully',
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
