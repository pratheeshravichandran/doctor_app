import { MessageSquare, Send } from "lucide-react"

const PatientMessages = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Secure Messages</h2>
        </div>
        <p className="text-gray-600 mb-6">Communicate securely with your healthcare team</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversations</h3>
            <div className="space-y-2">
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">Dr. Johnson</p>
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">New</div>
                </div>
                <p className="text-sm text-gray-600 truncate">Your test results are ready...</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-800">Nurse Mary</p>
                <p className="text-sm text-gray-600 truncate">Reminder: Please take your...</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-gray-800">Dr. Smith</p>
                <p className="text-sm text-gray-600 truncate">Follow-up appointment...</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-lg h-96 flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <p className="font-medium text-gray-800">Dr. Johnson</p>
                <p className="text-sm text-gray-600">Cardiology Department</p>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-800">
                      Your test results are ready for review. Everything looks normal, but I'd like to discuss a few
                      points with you.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Thank you for letting me know. When would be a good time to discuss?</p>
                    <p className="text-xs text-blue-200 mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-800">How about tomorrow at 2 PM? We can do a quick video call.</p>
                    <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientMessages
