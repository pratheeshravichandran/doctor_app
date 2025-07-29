import { Video, Calendar } from "lucide-react"

const PatientTelemedicine = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Video className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Video Consultations</h2>
        </div>
        <p className="text-gray-600 mb-6">Connect with your healthcare providers remotely</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-medium text-gray-800 mb-2">Upcoming Video Call</h3>
            <p className="text-sm text-gray-600 mb-3">Dr. Johnson - Dec 15, 2:30 PM</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Video className="w-4 h-4" />
              <span>Join Call</span>
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">Schedule New Call</h3>
            <p className="text-sm text-gray-600 mb-3">Book a video consultation</p>
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule Call</span>
            </button>
          </div>
        </div>

        {/* Video Call History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Video Consultations</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Dr. Johnson - Follow-up</p>
                <p className="text-sm text-gray-600">Nov 30, 2024 at 3:00 PM</p>
                <p className="text-xs text-gray-500">Duration: 25 minutes</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Notes</button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Dr. Smith - Consultation</p>
                <p className="text-sm text-gray-600">Nov 20, 2024 at 1:30 PM</p>
                <p className="text-xs text-gray-500">Duration: 30 minutes</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">View Notes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientTelemedicine
