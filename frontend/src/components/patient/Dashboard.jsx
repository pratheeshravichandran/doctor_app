import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Phone, Calendar, UserCheck, Stethoscope, Shield, CheckCircle, Building2, Upload, Image } from 'lucide-react';

const MedicalAuthApp = () => {

  const navigate = useNavigate(); 
  const [currentView, setCurrentView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [genders, setGenders] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    gender: '',
    role_id: '7', // Default role_id as 7
    lastName: '',
    phone: '',
    dateOfBirth: '',
    profile_pic: null
  });


  const roleToPath = {
    Admin: "/admin-dashboard",
    HR: "/hr-dashboard",
    Staff: "/staff-dashboard",
    Patient: "/patient-dashboard",
  };

  useEffect(() => {
    axios.get("/get/metadata").then(r => {
      setGenders(r.data.genders ?? []);
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_pic: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (currentView === 'login') {
      const credentials = {
        password: formData.password
      };
    
      // Check if user entered email or phone number
      if (formData.email?.includes('@')) {
        credentials.email = formData.email;
      } else {
        credentials.phone_number = formData.email; // used same field for both
      }
    
      try {
        const response = await axios.post('http://localhost:8000/api/login', credentials);
    
        const token = response.data.access_token;
        const role = response.data.user?.role?.role_name;
    
        if (token) {
          localStorage.setItem('token', `Bearer ${token}`);
        }
    
        if (role) {
          localStorage.setItem('userRole', role);
          const path = roleToPath[role];
          if (path) {
            navigate(path);
          } else {
            console.error('Unknown role:', role);
            alert('Unknown user role. Please contact administrator.');
          }
        } else {
          console.error('No role found in response');
          alert('User role not found. Please contact administrator.');
        }
      } catch (error) {
        console.error('Login error:', error);
    
        if (error.response && error.response.data) {
          const apiError = error.response.data.message ||
                           error.response.data.error ||
                           'Login failed';
          setErrors({ general: apiError });
        } else {
          setErrors({ general: 'Something went wrong. Please try again.' });
        }
      } finally {
        setIsLoading(false);
      }
    }
  else{
  
    const data = new FormData();
    data.append('first_name', formData.firstName);
    data.append('last_name', formData.lastName || '');
    data.append('gender', formData.gender);
    data.append('email', formData.email);
    data.append('phone_number', formData.phone);
    data.append('password', formData.password);
    data.append('role_id', formData.role_id || 7); // default role
    data.append('dob', formData.dateOfBirth);
    if (data.profile_pic) {
      formData.append('profile_pic', data.profile_pic);
    } 
  
    try {
      const response = await axios.post('/register', data); // No need for full URL because baseURL is set
      console.log('Registration successful:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Registration failed:', error.response.data.errors || error.response.data.error);
      } else {
        console.error('Network or other error:', error.message);
      }
    }
  };
};
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M50 50m-20 0a20 20 0 1 1 40 0a20 20 0 1 1 -40 0'/%3E%3Cpath d='M30 30l40 40m0-40l-40 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Content - Fixed height container with no scroll */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white h-full overflow-hidden">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">MediCare Professional</h1>
                <p className="text-blue-100 text-sm">Healthcare Management System</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex-shrink-0">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-green-800" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Patient Data</h3>
                <p className="text-blue-100 text-sm leading-relaxed">HIPAA-compliant platform ensuring complete privacy and security of medical records.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-5 h-5 text-purple-800" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Advanced Analytics</h3>
                <p className="text-blue-100 text-sm leading-relaxed">Comprehensive health insights and predictive analytics for better patient outcomes.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Building2 className="w-5 h-5 text-orange-800" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Multi-facility Support</h3>
                <p className="text-blue-100 text-sm leading-relaxed">Seamless integration across hospitals, clinics, and healthcare networks.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex-shrink-0">
            <p className="text-sm text-blue-100 italic">
              "This platform has revolutionized how we manage patient care. The interface is intuitive and the security features give us complete confidence."
            </p>
            <div className="mt-3 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-xs font-bold text-white">Dr</span>
              </div>
              <div>
                <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                <p className="text-xs text-blue-200">Chief Medical Officer, City Hospital</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {currentView === 'login' 
                ? 'Sign in to access your healthcare dashboard' 
                : 'Join our professional healthcare network'
              }
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Registration Fields */}
            {currentView === 'register' && (
              <>
                {/* Profile Picture Upload */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Profile Picture</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                      {profilePreview ? (
                        <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                      ) : (
                        <Image className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Photo
                        <input
                          type="file"
                          name="profile_pic"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
                    required
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    {genders.map((gender, index) => (
                      <option key={index} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>

                <div  style={{ display: 'none' }}>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Role</label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="role_id"
                      value={formData.role_id}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
                      required
                    >
                      <option value="7">Default Role (7)</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Registration */}
            {currentView === 'register' && (
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 bg-white"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot Password Link for Login */}
            {currentView === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
            >
              {currentView === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Terms and Conditions for Registration */}
            {currentView === 'register' && (
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                By creating an account, you agree to our{' '}
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Privacy Policy
                </button>
              </p>
            )}
          </div>

          {/* Toggle between Login/Register */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setCurrentView(currentView === 'login' ? 'register' : 'login')}
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                {currentView === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
              <p className="text-sm text-green-800">
                <span className="font-semibold">HIPAA Compliant:</span> Your data is encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAuthApp;