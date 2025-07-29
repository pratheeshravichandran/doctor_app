import { Pill, RefreshCw } from "lucide-react"

const PatientPrescriptions = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Pill className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Prescriptions</h2>
        </div>
        <p className="text-gray-600 mb-6">Manage your medications and refills</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Lisinopril 10mg</p>
              <p className="text-sm text-gray-600">Take once daily - 30 day supply</p>
              <p className="text-xs text-gray-500">Prescribed by Dr. Johnson</p>
              <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mt-1 w-fit">Refill Due Today</div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Request Refill</span>
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Metformin 500mg</p>
              <p className="text-sm text-gray-600">Take twice daily - 90 day supply</p>
              <p className="text-xs text-gray-500">Prescribed by Dr. Smith</p>
              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mt-1 w-fit">
                15 days remaining
              </div>
            </div>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              View Details
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Atorvastatin 20mg</p>
              <p className="text-sm text-gray-600">Take once daily - 90 day supply</p>
              <p className="text-xs text-gray-500">Prescribed by Dr. Johnson</p>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mt-1 w-fit">
                45 days remaining
              </div>
            </div>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              View Details
            </button>
          </div>
        </div>

        {/* Prescription History */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Prescription History</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Amoxicillin 500mg</p>
                <p className="text-sm text-gray-600">7-day course completed</p>
                <p className="text-xs text-gray-500">Nov 2024</p>
              </div>
              <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Completed</div>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Ibuprofen 400mg</p>
                <p className="text-sm text-gray-600">As needed for pain</p>
                <p className="text-xs text-gray-500">Oct 2024</p>
              </div>
              <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientPrescriptions
