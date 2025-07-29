<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\FileService;
use App\Models\Specialization;
use Carbon\Carbon;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Exception;
use Validator;
use DB;
use App\Models\User;


class AuthController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

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

    public function getSpecialization(): JsonResponse
    {
        try {
            $departments = Specialization::get();
    
            $formatted = $departments->map(function ($dept) {
                return [
                    'id' => $dept->id,
                    'name' => $dept->name,
                    'created_at' => $dept->created_at,
                    'updated_at' => $dept->updated_at,
                ];
            });
    
            return response()->json([
                'departments' => $formatted,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to retrieve departments', 'details' => $e->getMessage()], 500);
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
            'role_id' => 'required|exists:roles,id|not_in:1',
            'dob' => 'required_if:role,3,4|date',
           'profile_pic' => 'nullable|image|mimes:jpeg,png,jpg,gif,bmp,svg,webp,heic,heif,tiff'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
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
                'role_id' => $request->role_id,
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


    public function getAuthenticatedUser()
    {
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    
        return response()->json([
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'gender' => $user->gender,
                'role_name' => $user->role->role_name ?? null,
                'dob' => $user->dob,
                'profile_pic' => $user->profile_pic
                    ? $this->fileService->generateUrl($user->profile_pic)
                    : null,
            ],
            'message' => 'Authenticated user retrieved successfully'
        ]);
    }


    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required_without:phone_number|email',
                'phone_number' => 'required_without:email|string',
                'password' => 'required',
            ]);

            if ($request->filled('email')) {
                $request->merge(['email' => trim($request->email)]);
            }

            if($request->filled('phone_number')) {
                $request->merge(['phone_number' => trim($request->phone_number)]);
            }

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = User::where(function ($query) use ($request) {
                if ($request->filled('email')) {
                    $query->where('email', $request->email);
                }
                if ($request->filled('phone_number')) {
                    $query->orWhere('phone_number', $request->phone_number);
                }
            })->first();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Invalid password'], 401);
            }
            $token = $user->createToken('auth_token');
            $plainTextToken = $token->plainTextToken;
            $tokenId = $token->accessToken->id;

            $user->tokens()->where('last_used_at', '<', Carbon::now()->subDays(3))->delete();

            return response()->json([
                'message' => 'Login successful',
                'access_token' => $plainTextToken,
                'role' => $user->role->role_name,
                'token_type' => 'Bearer',
                'user' => $user->makeHidden(['password'])
                    ->setAttribute('profile_pic', $user->profile_pic ? $this->fileService->generateUrl($user->profile_pic) : null)

            ]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Login failed', 'details' => $e->getMessage()], 500);
        }
    }


    public function delete($id)
    {
        try {
            $user = User::findOrFail($id);
            if ($user->profile_pic && \Storage::disk('public')->exists($user->profile_pic)) {
                \Storage::disk('public')->delete($user->profile_pic);
            }
    
            $user->delete();
    
            return response()->json([
                'message' => 'User deleted successfully.',
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete user. ' . $e->getMessage()], 500);
        }
    }


}
