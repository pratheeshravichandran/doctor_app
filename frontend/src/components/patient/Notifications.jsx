import { Bell, Mail, MessageSquare, Smartphone, Calendar, Pill, FileText, CreditCard } from "lucide-react"

const PatientNotifications = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Notifications & Reminders</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Manage your notification preferences for SMS, Email, and Push notifications
        </p>

        {/* Notification Preferences */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Appointment Reminders</p>
                    <p className="text-sm text-gray-600">Get notified 24 hours before appointments</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    <MessageSquare className="w-3 h-3 inline mr-1" />
                    SMS
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Pill className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-800">Medication Reminders</p>
                    <p className="text-sm text-gray-600">Daily reminders for your prescriptions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email
                  </button>
                  <button className="bg-gray-300 text-gray-600 px-3 py-1 rounded text-sm">
                    <Smartphone className="w-3 h-3 inline mr-1" />
                    Push
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Test Results</p>
                    <p className="text-sm text-gray-600">Notifications when new results are available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    <MessageSquare className="w-3 h-3 inline mr-1" />
                    SMS
                  </button>
                  <button className="bg-gray-300 text-gray-600 px-3 py-1 rounded text-sm">
                    <Smartphone className="w-3 h-3 inline mr-1" />
                    Push
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Billing Alerts</p>
                    <p className="text-sm text-gray-600">Payment due dates and billing updates</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Appointment reminder</p>
                  <p className="text-xs text-gray-600">Dr. Johnson appointment tomorrow at 2:30 PM</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Test results available</p>
                  <p className="text-xs text-gray-600">Your blood test results are now available</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Medication reminder</p>
                  <p className="text-xs text-gray-600">Time to take your Lisinopril</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientNotifications
