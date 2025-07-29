import { useState } from "react"
import { Bell, User } from "lucide-react"
import PatientSidebar from "./Sidebar"
import PatientDashboard from "./Dashboard"
import PatientProfile from "./Profile"
import PatientAppointments from "./Appointments"
import PatientTelemedicine from "./Telemedicine"
import PatientMessages from "./Messages"
import PatientMedicalRecords from "./MedicalRecords"
import PatientPrescriptions from "./Prescriptions"
import PatientBilling from "./Billing"
import PatientNotifications from "./Notifications"
import PatientSettings from "./Settings"

const PatientPortal = () => {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <PatientDashboard />
      case "profile":
        return <PatientProfile />
      case "appointments":
        return <PatientAppointments />
      case "telemedicine":
        return <PatientTelemedicine />
      case "messages":
        return <PatientMessages />
      case "medical-records":
        return <PatientMedicalRecords />
      case "prescriptions":
        return <PatientPrescriptions />
      case "test-results":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Results</h2>
            <p className="text-gray-600">View your latest lab results and diagnostic tests.</p>
          </div>
        )
      case "doctors":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Doctors</h2>
            <p className="text-gray-600">Manage your healthcare provider network.</p>
          </div>
        )
      case "billing":
        return <PatientBilling />
      case "notifications":
        return <PatientNotifications />
      case "settings":
        return <PatientSettings />
      default:
        return <PatientDashboard />
    }
  }

  const getSectionTitle = () => {
    const titles = {
      dashboard: "Dashboard",
      profile: "Profile Management",
      appointments: "Appointments",
      telemedicine: "Video Consultations",
      messages: "Secure Messages",
      "medical-records": "Medical Records",
      prescriptions: "Prescriptions",
      "test-results": "Test Results",
      doctors: "My Doctors",
      billing: "Billing & Payments",
      notifications: "Notifications",
      settings: "Settings",
    }
    return titles[activeSection] || "Dashboard"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{getSectionTitle()}</h1>
            <p className="text-gray-600">Monday, July 29, 2025</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Patient ID: P12345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  )
}

export default PatientPortal
