import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

const MigrantDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogout = () => {
    setIsLoading(true);
    // Simulate logout process
    setTimeout(() => {
      // Clear any authentication data here if needed
      // localStorage.removeItem('authToken'); // example
      navigate('/login');
      setIsLoading(false);
    }, 800);
  };

  // Custom SVG Icons as components
  const HomeIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );

  const HeartIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );

  const UserIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const QuestionIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const LogoutIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const EmailIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const WarningIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  );

  // Health History Component
  const HealthHistory = () => (
    <div className="p-4 md:p-8">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 md:mb-8">
        Health History
      </h1>

      {/* Recent Medical Visits */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <CalendarIcon />
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Medical Visits
          </h2>
        </div>

        <div className="space-y-6">
          {/* General Checkup */}
          <div className="border-l-4 border-blue-500 pl-6 py-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">General Checkup</h3>
              <span className="text-sm text-gray-500">2024-09-10</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Doctor:</strong> Dr. Priya Nair
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Result:</strong> Normal
            </p>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Prescriptions:
              </p>
              <ul className="text-sm text-gray-600 ml-4 space-y-1">
                <li>• Vitamin D supplement</li>
              </ul>
            </div>
          </div>

          {/* Lab Test */}
          <div className="border-l-4 border-orange-500 pl-6 py-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">Lab Test</h3>
              <span className="text-sm text-gray-500">2024-08-15</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Doctor:</strong> Dr. Kumar
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Result:</strong> Blood sugar slightly elevated
            </p>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Prescriptions:
              </p>
              <ul className="text-sm text-gray-600 ml-4 space-y-1">
                <li>• Diet modification</li>
                <li>• Metformin 500mg</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Healthcare Support */}
      <div className="bg-green-50 rounded-lg border border-green-200 p-6 mt-8">
        <div className="flex items-center space-x-2 mb-6">
          <PhoneIcon />
          <h2 className="text-lg font-semibold text-green-800">
            Healthcare Support
          </h2>
        </div>

        <div className="space-y-4">
          {/* 24/7 Helpline */}
          <div className="bg-green-100 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="font-medium text-green-800">
                  24/7 Healthcare Helpline
                </h3>
                <p className="text-sm text-green-700">
                  Available in English & Malayalam
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Hotline */}
          <div className="flex items-center space-x-3">
            <PhoneIcon />
            <div>
              <p className="font-medium text-green-800">Emergency Hotline</p>
              <p className="text-sm text-green-700">+91 1800 425 1425</p>
            </div>
          </div>

          {/* Health Support */}
          <div className="flex items-center space-x-3">
            <EmailIcon />
            <div>
              <p className="font-medium text-green-800">Health Support</p>
              <p className="text-sm text-green-700">
                health@swaasthyam.kerala.gov.in
              </p>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 flex items-center space-x-2">
              <WarningIcon />
              <span>
                For health data updates, contact your assigned healthcare
                officer
              </span>
            </p>
          </div>

          <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            📞 Contact Healthcare Officer
          </button>
        </div>
      </div>
    </div>
  );

  // Home Dashboard Component
  const HomeDashboard = () => (
    <>
      {/* Welcome Header */}
      <div className="bg-blue-600 text-white p-4 md:p-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-2">
          Welcome back, Rajesh Kumar
        </h1>
        <p className="text-blue-100">Your health is our priority</p>
      </div>

      <div className="p-4 md:p-8 space-y-6 md:space-y-8">
        {/* Worker Profile */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-6 h-6 text-gray-600">
              <UserIcon />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Worker Profile
            </h2>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
              RK
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">
                Rajesh Kumar
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                QR ID: SW-2024-KL-001234
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Contact Information: +91 98765 43210
              </p>
              <p className="text-sm text-gray-600">
                Emergency Contact: +91 98765 43211
              </p>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 text-blue-700">
                  <WarningIcon />
                  <span className="text-sm font-medium">View Only Access</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Health data can only be viewed. Contact healthcare officer for
                  updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Health Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Current Health Status
          </h2>

          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
            ✓ Fit for Work
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Last Check-up</p>
              <p className="font-semibold">2024-09-10</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Check-up</p>
              <p className="font-semibold">2024-09-25</p>
            </div>
          </div>
        </div>

        {/* Emergency Alerts */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <WarningIcon />
            <h2 className="text-lg font-semibold text-gray-900">
              Emergency Alerts
            </h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <WarningIcon />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">
                  Blood pressure monitoring required
                </p>
                <p className="text-sm text-yellow-700">Medium Risk</p>
                <p className="text-xs text-yellow-600 mt-1">2024-09-12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (isLoading) {
    return <LoadingAnimation message="Logging out..." />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-blue-700 to-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/Cooked-Coders/assets/logo 2.png"
              alt="Swaasthyam Logo"
              className="w-8 h-8 object-contain"
            />
            <div>
              <h2 className="font-semibold text-lg">Swaasthyam</h2>
              <p className="text-sm text-blue-200">Migrant Worker</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-red-600 rounded-lg transition-colors"
          >
            <LogoutIcon />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="mt-4">
          <div className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveSection("home")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === "home"
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-600"
              }`}
            >
              <HomeIcon />
              <span className="text-sm">Home</span>
            </button>
            <button
              onClick={() => setActiveSection("health")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === "health"
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-600"
              }`}
            >
              <HeartIcon />
              <span className="text-sm">Health</span>
            </button>
            <button
              onClick={() => setActiveSection("profile")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === "profile"
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-600"
              }`}
            >
              <UserIcon />
              <span className="text-sm">Profile</span>
            </button>
            <button
              onClick={() => setActiveSection("help")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === "help"
                  ? "bg-blue-600 text-white"
                  : "text-blue-200 hover:bg-blue-600"
              }`}
            >
              <QuestionIcon />
              <span className="text-sm">Help</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-gradient-to-t from-black to-blue-700 text-white flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-blue-600">
          <div className="flex items-center space-x-3">
            <img
              src="/Cooked-Coders/assets/logo 2.png"
              alt="Swaasthyam Logo"
              className="w-8 h-8 object-contain rounded-lg bg-white p-1"
            />
            <div>
              <h2 className="font-semibold text-lg">Swaasthyam</h2>
              <p className="text-sm text-blue-200">Migrant Worker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("home")}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                  activeSection === "home"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                }`}
              >
                <HomeIcon />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("health")}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                  activeSection === "health"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                }`}
              >
                <HeartIcon />
                <span>Health</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("profile")}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                  activeSection === "profile"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                }`}
              >
                <UserIcon />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("help")}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left transition-colors ${
                  activeSection === "help"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-600"
                }`}
              >
                <QuestionIcon />
                <span>Help</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-600">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors w-full text-left">
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === "home" && <HomeDashboard />}
        {activeSection === "health" && <HealthHistory />}
        {activeSection === "profile" && (
          <div className="p-4 md:p-8">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Profile
            </h1>
            <p className="text-gray-600 text-center">
              Profile section - Content coming soon
            </p>
          </div>
        )}
        {activeSection === "help" && (
          <div className="p-4 md:p-8">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Help</h1>
            <p className="text-gray-600 text-center">
              Help section - Content coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MigrantDashboard;
