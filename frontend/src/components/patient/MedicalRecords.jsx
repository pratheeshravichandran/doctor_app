import { FileText, Download, Eye } from "lucide-react"

const PatientMedicalRecords = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Medical Records</h2>
        </div>
        <p className="text-gray-600 mb-6">View your medical history, lab results, and discharge summaries</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-medium text-gray-800 mb-2">Lab Results</h3>
            <p className="text-sm text-gray-600 mb-3">Latest blood work and tests</p>
            <button className="bg-white border border-blue-200 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm">
              View Results
            </button>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <h3 className="font-medium text-gray-800 mb-2">Discharge Summaries</h3>
            <p className="text-sm text-gray-600 mb-3">Hospital and clinic summaries</p>
            <button className="bg-white border border-green-200 text-green-700 py-2 px-4 rounded-lg hover:bg-green-50 transition-colors text-sm">
              View Summaries
            </button>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <h3 className="font-medium text-gray-800 mb-2">Medical History</h3>
            <p className="text-sm text-gray-600 mb-3">Complete health timeline</p>
            <button className="bg-white border border-purple-200 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-sm">
              View History
            </button>
          </div>
        </div>

        {/* Recent Records */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Records</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Blood Test Results</p>
                <p className="text-sm text-gray-600">Complete Blood Count (CBC)</p>
                <p className="text-xs text-gray-500">Dec 1, 2024</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Normal</div>
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Chest X-Ray</p>
                <p className="text-sm text-gray-600">Routine screening</p>
                <p className="text-xs text-gray-500">Nov 28, 2024</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Clear</div>
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Discharge Summary</p>
                <p className="text-sm text-gray-600">Emergency Room Visit</p>
                <p className="text-xs text-gray-500">Nov 15, 2024</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientMedicalRecords
