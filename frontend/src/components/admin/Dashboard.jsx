import React, { useState } from 'react';
import DoctorManagement from './DoctorManagement';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserCheck, 
  UsersRound, 
  CreditCard, 
  BarChart3, 
  Building2, 
  Microscope, 
  MessageSquare,
  Bell,
  Mail,
  Settings,
  User,
  Sliders,
  HelpCircle,
  Phone,
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  X,
  LogOut,
  ChevronLeft
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("activeSection") || "Dashboard";
  });  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      key: 'Dashboard'
    },
    {
      title: 'Patient Management',
      icon: Users,
      key: 'PatientManagement'
    },
    {
      title: 'Appointment Management',
      icon: Calendar,
      key: 'AppointmentManagement'
    },
    {
      title: 'Doctor Management',
      icon: UserCheck,
      key: 'DoctorManagement'
    },
    {
      title: 'Staff & User Management',
      icon: UsersRound,
      key: 'StaffManagement'
    },
    {
      title: 'Billing & Finance',
      icon: CreditCard,
      key: 'BillingFinance'
    },
    {
      title: 'Reports & Analytics',
      icon: BarChart3,
      key: 'ReportsAnalytics'
    },
    {
      title: 'Hospital Resources',
      icon: Building2,
      key: 'HospitalResources'
    },
    {
      title: 'Laboratory/Pharmacy',
      icon: Microscope,
      key: 'LabPharmacy'
    },
    {
      title: 'Communication',
      icon: MessageSquare,
      key: 'Communication',
      submenu: [
        { title: 'Notifications', icon: Bell, key: 'Notifications' },
        { title: 'Messages/Chats', icon: Mail, key: 'Messages' }
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      key: 'Settings',
      submenu: [
        { title: 'Profile Settings', icon: User, key: 'ProfileSettings' },
        { title: 'System Preferences', icon: Sliders, key: 'SystemPreferences' }
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      key: 'Support',
      submenu: [
        { title: 'Help/FAQ', icon: HelpCircle, key: 'HelpFAQ' },
        { title: 'Contact Support', icon: Phone, key: 'ContactSupport' }
      ]
    }
  ];

  const toggleSubmenu = (key) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSectionChange = (key) => {
    setActiveSection(key);
    localStorage.setItem("activeSection", key);
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'Dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
            </div>
            
            {/* Stats Cards with enhanced animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Patients', value: '2,847', change: '↑ 12%', color: 'blue', icon: Users },
                { title: "Today's Appointments", value: '127', change: '↑ 8%', color: 'green', icon: Calendar },
                { title: 'Active Doctors', value: '48', change: 'No change', color: 'purple', icon: UserCheck },
                { title: 'Revenue (Month)', value: '$284K', change: '↑ 18%', color: 'orange', icon: CreditCard }
              ].map((stat, idx) => (
                <div key={idx} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
                    </div>
                    <div className={`h-12 w-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                  <p className={`text-xs ${stat.change.includes('↑') ? 'text-green-600' : 'text-gray-500'} mt-2 group-hover:font-medium transition-all`}>{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Enhanced Activity Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-all">View All</button>
                </div>
                <div className="space-y-3">
                  {[
                    { patient: 'John Smith', doctor: 'Dr. Wilson', time: '10:30 AM', status: 'Confirmed' },
                    { patient: 'Sarah Johnson', doctor: 'Dr. Brown', time: '11:15 AM', status: 'In Progress' },
                    { patient: 'Mike Davis', doctor: 'Dr. Taylor', time: '2:00 PM', status: 'Pending' }
                  ].map((apt, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-[1.01] cursor-pointer group">
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-gray-800">{apt.patient}</p>
                        <p className="text-sm text-gray-600 group-hover:text-gray-700">{apt.doctor} • {apt.time}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 group-hover:scale-105 ${
                        apt.status === 'Confirmed' ? 'bg-green-100 text-green-800 group-hover:bg-green-200' :
                        apt.status === 'In Progress' ? 'bg-blue-100 text-blue-800 group-hover:bg-blue-200' :
                        'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">3 Active</span>
                </div>
                <div className="space-y-3">
                  {[
                    { type: 'error', title: 'Low Medicine Stock', desc: 'Paracetamol stock below minimum threshold', color: 'red' },
                    { type: 'warning', title: 'Equipment Maintenance Due', desc: 'MRI Machine scheduled for maintenance', color: 'yellow' },
                    { type: 'info', title: 'New Staff Registration', desc: '3 new staff members pending approval', color: 'blue' }
                  ].map((alert, idx) => (
                    <div key={idx} className={`flex items-start space-x-3 p-3 bg-${alert.color}-50 rounded-lg border-l-4 border-${alert.color}-400 hover:bg-${alert.color}-100 transition-all duration-200 hover:scale-[1.01] cursor-pointer group`}>
                      <Bell className={`h-5 w-5 text-${alert.color}-500 mt-0.5 group-hover:animate-pulse`} />
                      <div className="flex-1">
                        <p className={`text-sm font-medium text-${alert.color}-800 group-hover:text-${alert.color}-900`}>{alert.title}</p>
                        <p className={`text-xs text-${alert.color}-600 group-hover:text-${alert.color}-700`}>{alert.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {activeSection === "DoctorManagement" ? (
              <DoctorManagement />
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  {activeSection.replace(/([A-Z])/g, ' $1').trim()}
                </h1>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-gray-200 hover:scale-110 transition-all duration-300">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeSection.replace(/([A-Z])/g, ' $1').trim()} Module
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This section is ready for implementation. Content and functionality will be added based on specific requirements.
                  </p>
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Light Theme */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-xl border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 relative">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <h2 className="font-bold text-gray-900">MedAdmin</h2>
                <p className="text-xs text-gray-500">Hospital Management</p>
              </div>
            )}
          </div>
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.key}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(item.key);
                  } else {
                    handleSectionChange(item.key);
                  }
                }}
                className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                  activeSection === item.key 
                    ? 'bg-gray-900 text-white shadow-lg transform scale-[1.02]' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  {sidebarOpen && <span className="font-medium">{item.title}</span>}
                </div>
                {sidebarOpen && item.submenu && (
                  <div className={`transition-transform duration-200 ${expandedMenus[item.key] ? 'rotate-180' : ''}`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                )}
              </button>
              
              {/* Submenu */}
              {sidebarOpen && item.submenu && expandedMenus[item.key] && (
                <div className="ml-6 mt-2 space-y-1 animate-in slide-in-from-top duration-200">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.key}
                      onClick={() => handleSectionChange(subitem.key)}
                      className={`w-full flex items-center space-x-3 p-2 text-left rounded-lg transition-all duration-200 hover:scale-[1.01] ${
                        activeSection === subitem.key 
                          ? 'bg-gray-800 text-white border-l-2 border-blue-400' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <subitem.icon className="h-4 w-4" />
                      <span className="text-sm">{subitem.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile & Sign Out - Integrated into sidebar */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          {sidebarOpen ? (
            <>  
              {/* Sign Out Button */}
              <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 group hover:scale-[1.02]">
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              {/* Collapsed User Avatar */}
              <div className="flex justify-center mb-2">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200 cursor-pointer">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
              
              {/* Collapsed Sign Out Button */}
              <button className="w-full flex justify-center p-2 text-gray-700 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 group hover:scale-105">
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {activeSection.replace(/([A-Z])/g, ' $1').trim()}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
              </button>
              
              {/* Profile */}
              <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-all duration-200 cursor-pointer">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
