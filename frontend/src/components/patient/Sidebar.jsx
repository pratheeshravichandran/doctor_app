"use client"

import {
  Home,
  Calendar,
  FileText,
  Activity,
  Heart,
  Pill,
  Users,
  CreditCard,
  Settings,
  LogOut,
  User,
  MessageSquare,
  Video,
  Bell,
} from "lucide-react"

const PatientSidebar = ({ activeSection, setActiveSection }) => {
  const mainMenuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "profile", icon: User, label: "Profile Management" },
    { id: "appointments", icon: Calendar, label: "Appointments" },
    { id: "telemedicine", icon: Video, label: "Video Consultations" },
    { id: "messages", icon: MessageSquare, label: "Secure Messages" },
  ]

  const healthMenuItems = [
    { id: "medical-records", icon: FileText, label: "Medical Records" },
    { id: "prescriptions", icon: Pill, label: "Prescriptions" },
    { id: "test-results", icon: Activity, label: "Lab Results" },
    { id: "doctors", icon: Users, label: "My Doctors" },
  ]

  const accountMenuItems = [
    { id: "billing", icon: CreditCard, label: "Billing & Payments" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  const MenuSection = ({ title, items }) => (
    <div className="mb-6">
      <h3 className="text-blue-200 text-xs uppercase tracking-wider font-semibold mb-3 px-6">{title}</h3>
      <nav>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-blue-700 transition-colors ${
                activeSection === item.id ? "bg-blue-700 border-r-4 border-white" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white h-screen fixed left-0 top-0 shadow-2xl overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-blue-500">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">HealthCare</h1>
            <p className="text-blue-200 text-sm">Patient Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="mt-6">
        <MenuSection title="Main" items={mainMenuItems} />
        <MenuSection title="Health Records" items={healthMenuItems} />
        <MenuSection title="Account" items={accountMenuItems} />
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 w-full p-6 border-t border-blue-500">
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-blue-700 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default PatientSidebar
