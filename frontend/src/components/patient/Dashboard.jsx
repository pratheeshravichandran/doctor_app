import { Calendar, Heart, Activity, Pill, Video, MessageSquare } from "lucide-react"

const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, Sarah!</h2>
        <p className="text-gray-600">Here's your health summary for today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Next Appointment</p>
              <p className="text-2xl font-bold text-gray-800">Dec 15</p>
              <p className="text-sm text-blue-600">Dr. Johnson - 2:30 PM</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Heart Rate</p>
              <p className="text-2xl font-bold text-gray-800">72 BPM</p>
              <p className="text-sm text-green-600">Normal</p>
            </div>
            <Heart className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Blood Pressure</p>
              <p className="text-2xl font-bold text-gray-800">120/80</p>
              <p className="text-sm text-green-600">Good</p>
            </div>
            <Activity className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Prescriptions</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-sm text-orange-600">2 due today</p>
            </div>
            <Pill className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center h-20 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors space-y-2">
            <Calendar className="w-6 h-6" />
            <span className="text-sm font-medium">Book Appointment</span>
          </button>
          <button className="flex flex-col items-center justify-center h-20 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors space-y-2">
            <Video className="w-6 h-6" />
            <span className="text-sm font-medium">Start Video Call</span>
          </button>
          <button className="flex flex-col items-center justify-center h-20 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors space-y-2">
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm font-medium">Message Doctor</span>
          </button>
        </div>
      </div>

      {/* Recent Activity & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Blood test results uploaded</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Appointment with Dr. Smith completed</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Prescription refill requested</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Dr. Johnson - Cardiology</p>
                <p className="text-sm text-gray-600">Dec 15, 2024 at 2:30 PM</p>
              </div>
              <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                <Video className="w-3 h-3" />
                <span>Video</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Dr. Davis - General</p>
                <p className="text-sm text-gray-600">Dec 22, 2024 at 10:00 AM</p>
              </div>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">In-Person</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Health metrics chart would be displayed here</p>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
