import { CreditCard, Download } from "lucide-react"

const PatientBilling = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Billing & Payments</h2>
        </div>
        <p className="text-gray-600 mb-6">View bills, payment history, and manage payment methods</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <h3 className="font-medium text-gray-800 mb-2">Outstanding Balance</h3>
            <p className="text-2xl font-bold text-red-600">$245.00</p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors mt-2">
              Pay Now
            </button>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-medium text-gray-800 mb-2">Next Payment Due</h3>
            <p className="text-2xl font-bold text-gray-800">Dec 30</p>
            <p className="text-sm text-gray-600">$125.00</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <h3 className="font-medium text-gray-800 mb-2">Insurance Coverage</h3>
            <p className="text-sm text-gray-600">Blue Cross Blue Shield</p>
            <p className="text-xs text-gray-500">Policy: BC123456789</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Dr. Johnson Consultation</p>
                <p className="text-sm text-gray-600">Video consultation - Cardiology</p>
                <p className="text-xs text-gray-500">Dec 1, 2024</p>
              </div>
              <div className="text-right flex items-center space-x-2">
                <div>
                  <p className="font-medium text-gray-800">$150.00</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
                <button className="text-gray-600 hover:text-gray-800 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Lab Tests</p>
                <p className="text-sm text-gray-600">Blood work and analysis</p>
                <p className="text-xs text-gray-500">Nov 28, 2024</p>
              </div>
              <div className="text-right flex items-center space-x-2">
                <div>
                  <p className="font-medium text-gray-800">$95.00</p>
                  <p className="text-sm text-red-600">Pending</p>
                </div>
                <button className="text-gray-600 hover:text-gray-800 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Prescription Refill</p>
                <p className="text-sm text-gray-600">Lisinopril 10mg - 30 day supply</p>
                <p className="text-xs text-gray-500">Nov 20, 2024</p>
              </div>
              <div className="text-right flex items-center space-x-2">
                <div>
                  <p className="font-medium text-gray-800">$25.00</p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
                <button className="text-gray-600 hover:text-gray-800 p-1">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                  VISA
                </div>
                <div>
                  <p className="font-medium text-gray-800">**** **** **** 1234</p>
                  <p className="text-sm text-gray-600">Expires 12/26</p>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Primary</div>
            </div>
            <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
              + Add New Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientBilling
