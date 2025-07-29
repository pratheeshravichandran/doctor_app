import { Calendar, Clock, Video } from "lucide-react"

const PatientAppointments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
          <p className="text-gray-600">Book, manage, and cancel your appointments</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Book New Appointment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Dr. Johnson - Cardiology</p>
                <p className="text-sm text-gray-600">Dec 15, 2024 at 2:30 PM</p>
                <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mt-1 w-fit">
                  <Video className="w-3 h-3" />
                  <span>Video Consultation</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Reschedule
                </button>
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Dr. Davis - General Practice</p>
                <p className="text-sm text-gray-600">Dec 22, 2024 at 10:00 AM</p>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mt-1 w-fit">In-Person</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Reschedule
                </button>
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Time Slots</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>Today - 3:00 PM</span>
            </button>
            <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>Tomorrow - 10:30 AM</span>
            </button>
            <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span>Dec 16 - 2:15 PM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Appointment History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Dr. Smith - General Checkup</p>
              <p className="text-sm text-gray-600">Nov 28, 2024 at 2:00 PM</p>
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</div>
          </div>
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Dr. Wilson - Dermatology</p>
              <p className="text-sm text-gray-600">Nov 15, 2024 at 11:30 AM</p>
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientAppointments
