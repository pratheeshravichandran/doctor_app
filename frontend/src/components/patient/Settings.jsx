import { Settings, Shield, Download, Globe } from "lucide-react"

const PatientSettings = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        </div>
        <p className="text-gray-600 mb-6">Manage your account settings and preferences</p>

        <div className="space-y-6">
          {/* Privacy & Security */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy & Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Privacy Settings</p>
                    <p className="text-sm text-gray-600">Control who can access your information</p>
                  </div>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Manage
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Change Password</p>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Account Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Language & Region</p>
                    <p className="text-sm text-gray-600">English (US) - Eastern Time</p>
                  </div>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Update
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Theme Preference</p>
                  <p className="text-sm text-gray-600">Light mode</p>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Export Medical Data</p>
                    <p className="text-sm text-gray-600">Download your complete medical records</p>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Export
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Data Retention</p>
                  <p className="text-sm text-gray-600">Manage how long your data is stored</p>
                </div>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Configure
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p className="font-medium text-red-800">Delete Account</p>
                  <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientSettings
