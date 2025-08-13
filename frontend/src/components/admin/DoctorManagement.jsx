"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { showSuccess, showError } from "@/utils/toastUtils";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, FileText, Shield, MapPin, Settings, Award, ChevronRight, ChevronLeft, Save, Plus, X } from "lucide-react"


export default function DoctorRegistrationForm() {

  const [currentStep, setCurrentStep] = useState(1)
  const [genders, setGenders] = useState([]);
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem("token");
  const [emailCheckStatus, setEmailCheckStatus] = useState(null); // null | "checking" | "success" | "notfound"
  const [userFetchedData, setUserFetchedData] = useState(null); // user data from API if any
  const [canProceed, setCanProceed] = useState(false);
  const [isUserFetched, setIsUserFetched] = useState(false);



  // Personal Information State - Updated
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    role: "",
    password: "",
    profilePic: null,
  })

  // Professional Details State
  const [professionalData, setProfessionalData] = useState({
    medicalRegNumber: "",
    registrationCouncil: "",
    registrationState: "",
    yearOfRegistration: "",
    qualifications: [],
    certificates: [],
    specializations: [],
    experience: "",
    hospitalAffiliations: [],
    licenses: [],
  })

  // Compliance Data State - Updated with bank details and PAN
  const [complianceData, setComplianceData] = useState({
    aadhaarNumber: "",
    aadhaarDoc: null,
    panNumber: "",
    panDoc: null,
    accountNumber: "",
    ifscCode: "",
    branch: "",
    accountHolderName: "",
    kycDocs: [],
  })

  // Practice Information State
  const [practiceData, setPracticeData] = useState({
    practiceAddress: "",
    consultationHours: "",
    consultationDays: [],
    consultationFee: "",
    telemedicineAvailable: false,
    preferredLanguages: [],
  })

  // Account Security State - Simplified (removed password as it's in personal info)
  const [accountData, setAccountData] = useState({
    username: "",
    confirmPassword: "",
  })

  // Optional Information State
  const [optionalData, setOptionalData] = useState({
    alternateContact: "",
    alternateEmail: "",
    linkedProfiles: [],
    associations: [],
    awards: [],
  })

  // Input states for dynamic arrays - ALL HOOKS MUST BE AT TOP LEVEL
  const [newQualification, setNewQualification] = useState("")
  const [newSpecialization, setNewSpecialization] = useState("")
  const [newAffiliation, setNewAffiliation] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [newProfile, setNewProfile] = useState("")
  const [newAssociation, setNewAssociation] = useState("")
  const [newAward, setNewAward] = useState("")

  const steps = [
    { id: 1, title: "Personal Information", icon: User, color: "bg-blue-500" },
    { id: 2, title: "Professional Details", icon: FileText, color: "bg-green-500" },
    { id: 3, title: "Official IDs & Compliance", icon: Shield, color: "bg-orange-500" },
    { id: 4, title: "Practice Information", icon: MapPin, color: "bg-purple-500" },
    { id: 5, title: "Account Security", icon: Settings, color: "bg-red-500" },
    { id: 6, title: "Optional Information", icon: Award, color: "bg-indigo-500" },
  ]

  const roleOptions = [
    { value: "doctor", label: "Doctor" },
    { value: "specialist", label: "Specialist" },
    { value: "consultant", label: "Consultant" },
    { value: "surgeon", label: "Surgeon" },
    { value: "resident", label: "Resident Doctor" },
    { value: "intern", label: "Medical Intern" },
  ]

  const handlePersonalDataChange = (field, value) => {
    setPersonalData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEmailBlur = async () => {
    if (!personalData.email) return;
  
    setEmailCheckStatus("checking");
    try {
      const res = await axios.get("/user-by-email", {
        params: { email: personalData.email },
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      if (res.data.success) {
        setUserFetchedData(res.data.user); 
        setPersonalData((prev) => ({
          ...prev,
          firstName: res.data.user.first_name,
          lastName: res.data.user.last_name,
          phoneNumber:res.data.user.phone_number,
          email: res.data.user.email,
          dob: res.data.user.dob ? res.data.user.dob.split("T")[0] : "",
          gender:  res.data.user.gender,
          role: String(res.data.user.role_id),
          profilePic: null,
        }));
        showSuccess("Doctor already present");
        setEmailCheckStatus("success");
        setCanProceed(true);
        setIsUserFetched(true); 
      } else {
        setUserFetchedData(null);
        setEmailCheckStatus("notfound");
        setIsUserFetched(false); 
      }
    } catch {
      setEmailCheckStatus("notfound");
      setUserFetchedData(null);
    }
  };
  

  const handleFileUpload = (field, file, dataType = "personal") => {
    const setters = {
      personal: setPersonalData,
      professional: setProfessionalData,
      compliance: setComplianceData,
    }
    setters[dataType]((prev) => ({ ...prev, [field]: file }))
  }

  const addArrayItem = (field, value, dataType) => {
    const setters = {
      professional: setProfessionalData,
      practice: setPracticeData,
      optional: setOptionalData,
    }
    if (value.trim()) {
      setters[dataType]((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }))
    }
  }

  const removeArrayItem = (field, index, dataType) => {
    const setters = {
      professional: setProfessionalData,
      practice: setPracticeData,
      optional: setOptionalData,
    }
    setters[dataType]((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  useEffect(() => {
      axios.get("/get/metadata").then(r => {
        setGenders(r.data.genders ?? []);
        setRoles(r.data.roles??[]);
      });
    }, []);

  const savePersonalInfo = async () => {
    const data = new FormData();
    data.append('first_name', personalData.firstName);
    data.append('last_name', personalData.lastName || '');
    data.append('gender', personalData.gender);
    data.append('email', personalData.email);
    data.append('phone_number', personalData.phoneNumber);
    data.append('password', personalData.password);
    data.append('role_id', personalData.role); 
    data.append('dob', personalData.dob);
    if (personalData.profile_pic) {
      data.append('profile_pic', personalData.profile_pic);
    }
   console.log(personalData.role);
    try {
      const response = await axios.post('/register', data); 
      console.log('Registration successful:', response.data);
      showSuccess("Doctor registered successfully!");
      setCanProceed(true);
    } catch (error) {
      const errors = error.response?.data?.errors;
      const fallback = error.response?.data?.error || "Something went wrong!";
    
      let message = fallback;
    
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        message = errors[firstKey][0];
      }
    
      console.error("Registration failed:", errors || fallback);
      showError(message); 
    }
    
  }


  const saveFinalRegistration = async () => {
    const completeData = {
      personal: personalData,
      professional: professionalData,
      compliance: complianceData,
      practice: practiceData,
      account: accountData,
      optional: optionalData,
    }
    console.log("Complete doctor registration data:", completeData)
    alert("Doctor registration completed successfully!")
  }

  const renderPersonalInformation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            value={personalData.firstName}
            onChange={(e) => handlePersonalDataChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            value={personalData.lastName}
            onChange={(e) => handlePersonalDataChange("lastName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={personalData.email}
            onChange={(e) => handlePersonalDataChange("email", e.target.value)}
            onBlur={handleEmailBlur}
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={personalData.phoneNumber}
            onChange={(e) => handlePersonalDataChange("phoneNumber", e.target.value)}
            placeholder="+91 XXXXXXXXXX"
            required
          />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input
            id="dob"
            type="date"
            value={personalData.dob}
            onChange={(e) => handlePersonalDataChange("dob", e.target.value)}
            required
          />
        </div>
        <div>
      <Label htmlFor="gender">Gender *</Label>
      <Select
        value={personalData.gender}
        onValueChange={(value) => handlePersonalDataChange("gender", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent>
        {genders.map((gender) => (
  <SelectItem key={gender} value={gender}>
    {gender}
  </SelectItem>
))}
</SelectContent>
      </Select>
    </div>
    <div>
  <Label htmlFor="role">Role *</Label>
  <Select
    value={personalData.role}
    onValueChange={(value) => handlePersonalDataChange("role", value)}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Role" />
    </SelectTrigger>
    <SelectContent>
    {roles.map((role) => (
  <SelectItem key={role.id} value={String(role.id)}>
    {role.role_name}
  </SelectItem>
))}
    </SelectContent>
  </Select>
</div>

        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={personalData.password}
            onChange={(e) => handlePersonalDataChange("password", e.target.value)}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="profilePic">Profile Picture (Passport-sized)</Label>
          <Input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload("profilePic", e.target.files[0])}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={savePersonalInfo} className="flex items-center gap-2" disabled={isUserFetched} >
          <Save size={20} />
          Save Personal Information
        </Button>
      </div>
    </div>
  )

  const renderProfessionalDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="medicalRegNumber">Medical Registration Number *</Label>
          <Input
            id="medicalRegNumber"
            type="text"
            value={professionalData.medicalRegNumber}
            onChange={(e) => setProfessionalData((prev) => ({ ...prev, medicalRegNumber: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="registrationCouncil">Registration Council *</Label>
          <Input
            id="registrationCouncil"
            type="text"
            value={professionalData.registrationCouncil}
            onChange={(e) => setProfessionalData((prev) => ({ ...prev, registrationCouncil: e.target.value }))}
            placeholder="e.g., Medical Council of India"
            required
          />
        </div>
        <div>
          <Label htmlFor="registrationState">Registration State *</Label>
          <Input
            id="registrationState"
            type="text"
            value={professionalData.registrationState}
            onChange={(e) => setProfessionalData((prev) => ({ ...prev, registrationState: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="yearOfRegistration">Year of Registration *</Label>
          <Input
            id="yearOfRegistration"
            type="number"
            value={professionalData.yearOfRegistration}
            onChange={(e) => setProfessionalData((prev) => ({ ...prev, yearOfRegistration: e.target.value }))}
            min="1950"
            max={new Date().getFullYear()}
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="experience">Years of Experience *</Label>
          <Input
            id="experience"
            type="number"
            value={professionalData.experience}
            onChange={(e) => setProfessionalData((prev) => ({ ...prev, experience: e.target.value }))}
            min="0"
            required
          />
        </div>
      </div>

      {/* Educational Qualifications */}
      <div>
        <Label>Educational Qualifications</Label>
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            value={newQualification}
            onChange={(e) => setNewQualification(e.target.value)}
            placeholder="e.g., MBBS, MD, DM, DNB"
            className="flex-1"
          />
          <Button
            onClick={() => {
              addArrayItem("qualifications", newQualification, "professional")
              setNewQualification("")
            }}
            size="icon"
          >
            <Plus size={20} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {professionalData.qualifications.map((qual, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2">
              {qual}
              <button
                onClick={() => removeArrayItem("qualifications", index, "professional")}
                className="hover:text-red-600"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Specializations */}
      <div>
        <Label>Area(s) of Specialization</Label>
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            value={newSpecialization}
            onChange={(e) => setNewSpecialization(e.target.value)}
            placeholder="e.g., Cardiology, Neurology"
            className="flex-1"
          />
          <Button
            onClick={() => {
              addArrayItem("specializations", newSpecialization, "professional")
              setNewSpecialization("")
            }}
            size="icon"
          >
            <Plus size={20} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {professionalData.specializations.map((spec, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2">
              {spec}
              <button
                onClick={() => removeArrayItem("specializations", index, "professional")}
                className="hover:text-red-600"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Hospital Affiliations */}
      <div>
        <Label>Current/Previous Hospital Affiliations</Label>
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            value={newAffiliation}
            onChange={(e) => setNewAffiliation(e.target.value)}
            placeholder="Hospital/Clinic Name"
            className="flex-1"
          />
          <Button
            onClick={() => {
              addArrayItem("hospitalAffiliations", newAffiliation, "professional")
              setNewAffiliation("")
            }}
            size="icon"
          >
            <Plus size={20} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {professionalData.hospitalAffiliations.map((affiliation, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2">
              {affiliation}
              <button
                onClick={() => removeArrayItem("hospitalAffiliations", index, "professional")}
                className="hover:text-red-600"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* File Uploads */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="certificates">Upload Qualification Certificates</Label>
          <Input
            id="certificates"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload("certificates", Array.from(e.target.files), "professional")}
          />
        </div>
        <div>
          <Label htmlFor="licenses">Professional License/Certificate Upload</Label>
          <Input
            id="licenses"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload("licenses", Array.from(e.target.files), "professional")}
          />
        </div>
      </div>
    </div>
  )

  const renderComplianceInfo = () => (
    <div className="space-y-6">
      {/* Identity Documents */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Identity Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
            <Input
              id="aadhaarNumber"
              type="text"
              value={complianceData.aadhaarNumber}
              onChange={(e) => setComplianceData((prev) => ({ ...prev, aadhaarNumber: e.target.value }))}
              placeholder="XXXX XXXX XXXX"
              required
            />
          </div>
          <div>
            <Label htmlFor="panNumber">PAN Card Number *</Label>
            <Input
              id="panNumber"
              type="text"
              value={complianceData.panNumber}
              onChange={(e) => setComplianceData((prev) => ({ ...prev, panNumber: e.target.value }))}
              placeholder="ABCDE1234F"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="aadhaarDoc">Aadhaar Card Upload *</Label>
            <Input
              id="aadhaarDoc"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload("aadhaarDoc", e.target.files[0], "compliance")}
              required
            />
          </div>
          <div>
            <Label htmlFor="panDoc">PAN Card Upload *</Label>
            <Input
              id="panDoc"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload("panDoc", e.target.files[0], "compliance")}
              required
            />
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Bank Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="accountHolderName">Account Holder Name *</Label>
            <Input
              id="accountHolderName"
              type="text"
              value={complianceData.accountHolderName}
              onChange={(e) => setComplianceData((prev) => ({ ...prev, accountHolderName: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="accountNumber">Account Number *</Label>
            <Input
              id="accountNumber"
              type="text"
              value={complianceData.accountNumber}
              onChange={(e) => setComplianceData((prev) => ({ ...prev, accountNumber: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="ifscCode">IFSC Code *</Label>
            <Input
              id="ifscCode"
              type="text"
              value={complianceData.ifscCode}
              onChange={(e) => setComplianceData((prev) => ({ ...prev, ifscCode: e.target.value }))}
              placeholder="e.g., SBIN0001234"
              required
            />
          </div>
          <div>
            <Label htmlFor="branch">Branch Name *</Label>
            <Input
              id="branch"
              type="text"
              value={complianceData.branch}
              onChange={(e) => setComplianceData((prev) => ({ ...prev, branch: e.target.value }))}
              required
            />
          </div>
        </div>
      </div>

      {/* Additional KYC Documents */}
      <div>
        <Label htmlFor="kycDocs">Other KYC Documents</Label>
        <Input
          id="kycDocs"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload("kycDocs", Array.from(e.target.files), "compliance")}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Upload additional documents such as Driving License, Passport, etc.
        </p>
      </div>
    </div>
  )

  const renderPracticeInfo = () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="practiceAddress">Practice/Clinic Address *</Label>
          <Textarea
            id="practiceAddress"
            value={practiceData.practiceAddress}
            onChange={(e) => setPracticeData((prev) => ({ ...prev, practiceAddress: e.target.value }))}
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="consultationHours">Consultation Hours *</Label>
            <Input
              id="consultationHours"
              type="text"
              value={practiceData.consultationHours}
              onChange={(e) => setPracticeData((prev) => ({ ...prev, consultationHours: e.target.value }))}
              placeholder="e.g., 10:00 AM - 6:00 PM"
              required
            />
          </div>
          <div>
            <Label htmlFor="consultationFee">Consultation Fee (₹) *</Label>
            <Input
              id="consultationFee"
              type="number"
              value={practiceData.consultationFee}
              onChange={(e) => setPracticeData((prev) => ({ ...prev, consultationFee: e.target.value }))}
              min="0"
              required
            />
          </div>
        </div>
        <div>
          <Label>Consultation Days</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={practiceData.consultationDays.includes(day)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPracticeData((prev) => ({ ...prev, consultationDays: [...prev.consultationDays, day] }))
                    } else {
                      setPracticeData((prev) => ({
                        ...prev,
                        consultationDays: prev.consultationDays.filter((d) => d !== day),
                      }))
                    }
                  }}
                />
                <Label htmlFor={day} className="text-sm">
                  {day}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="telemedicine"
            checked={practiceData.telemedicineAvailable}
            onCheckedChange={(checked) => setPracticeData((prev) => ({ ...prev, telemedicineAvailable: checked }))}
          />
          <Label htmlFor="telemedicine">Telemedicine Available</Label>
        </div>
        <div>
          <Label>Preferred Languages</Label>
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="e.g., English, Hindi, Tamil"
              className="flex-1"
            />
            <Button
              onClick={() => {
                addArrayItem("preferredLanguages", newLanguage, "practice")
                setNewLanguage("")
              }}
              size="icon"
            >
              <Plus size={20} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {practiceData.preferredLanguages.map((lang, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-2">
                {lang}
                <button
                  onClick={() => removeArrayItem("preferredLanguages", index, "practice")}
                  className="hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderAccountSecurity = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="username">Username *</Label>
        <Input
          id="username"
          type="text"
          value={accountData.username}
          onChange={(e) => setAccountData((prev) => ({ ...prev, username: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={accountData.confirmPassword}
          onChange={(e) => setAccountData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          required
        />
        {accountData.confirmPassword && personalData.password !== accountData.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
        )}
      </div>
    </div>
  )

  const renderOptionalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="alternateContact">Alternate Contact Number</Label>
          <Input
            id="alternateContact"
            type="tel"
            value={optionalData.alternateContact}
            onChange={(e) => setOptionalData((prev) => ({ ...prev, alternateContact: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="alternateEmail">Alternate Email Address</Label>
          <Input
            id="alternateEmail"
            type="email"
            value={optionalData.alternateEmail}
            onChange={(e) => setOptionalData((prev) => ({ ...prev, alternateEmail: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <Label>Linked Professional Profiles</Label>
        <div className="flex gap-2 mb-2">
          <Input
            type="url"
            value={newProfile}
            onChange={(e) => setNewProfile(e.target.value)}
            placeholder="e.g., Practo, LinkedIn profile URL"
            className="flex-1"
          />
          <Button
            onClick={() => {
              addArrayItem("linkedProfiles", newProfile, "optional")
              setNewProfile("")
            }}
            size="icon"
          >
            <Plus size={20} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {optionalData.linkedProfiles.map((profile, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2">
              {profile}
              <button
                onClick={() => removeArrayItem("linkedProfiles", index, "optional")}
                className="hover:text-red-600"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <Label>Medical Association Memberships</Label>
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            value={newAssociation}
            onChange={(e) => setNewAssociation(e.target.value)}
            placeholder="e.g., Indian Medical Association"
            className="flex-1"
          />
          <Button
            onClick={() => {
              addArrayItem("associations", newAssociation, "optional")
              setNewAssociation("")
            }}
            size="icon"
          >
            <Plus size={20} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {optionalData.associations.map((association, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2">
              {association}
              <button onClick={() => removeArrayItem("associations", index, "optional")} className="hover:text-red-600">
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <Label>Awards and Recognitions</Label>
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            value={newAward}
            onChange={(e) => setNewAward(e.target.value)}
            placeholder="e.g., Best Doctor Award 2023"
            className="flex-1"
          />
          <Button
            onClick={() => {
              addArrayItem("awards", newAward, "optional")
              setNewAward("")
            }}
            size="icon"
          >
            <Plus size={20} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {optionalData.awards.map((award, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2">
              {award}
              <button onClick={() => removeArrayItem("awards", index, "optional")} className="hover:text-red-600">
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInformation()
      case 2:
        return renderProfessionalDetails()
      case 3:
        return renderComplianceInfo()
      case 4:
        return renderPracticeInfo()
      case 5:
        return renderAccountSecurity()
      case 6:
        return renderOptionalInfo()
      default:
        return renderPersonalInformation()
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Registration</h1>
        <p className="text-gray-600">Admin Panel - Complete doctor profile setup</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            return (
              <div key={step.id} className="flex flex-col items-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mb-2 ${
                    isActive ? step.color : isCompleted ? "bg-gray-400" : "bg-gray-200"
                  }`}
                >
                  {isCompleted ? "✓" : <Icon size={16} />}
                </div>
                <span
                  className={`text-xs font-medium text-center max-w-20 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10" />
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">{steps.find((step) => step.id === currentStep)?.title}</CardTitle>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          onClick={prevStep}
          disabled={currentStep === 1}
          variant={currentStep === 1 ? "secondary" : "outline"}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>
        {currentStep === steps.length ? (
          <Button onClick={saveFinalRegistration} className="flex items-center gap-2">
            <Save size={16} />
            Complete Registration
          </Button>
        ) : (
          <Button onClick={nextStep} className="flex items-center gap-2"   disabled={!canProceed} >
            Next
            <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
