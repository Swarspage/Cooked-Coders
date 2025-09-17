import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

const LoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("migrant");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
  };

  const handlePastePhone = (e) => {
    const pasted = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 10);
    e.preventDefault();
    setPhone(pasted);
  };

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      alert("Please enter a 10-digit mobile number");
      return;
    }
    setShowOtp(true);
    setOtp("");
    // TODO: trigger backend OTP send
  };

  const handleOtpChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(digits);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with loading animation
    setTimeout(() => {
      if (selectedUserType === "officer") {
        navigate("/officer");
      } else if (selectedUserType === "official") {
        navigate("/official-dashboard");
      } else if (selectedUserType === "migrant") {
        navigate("/migrant-dashboard");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRegisterClick = () => {
    if (selectedUserType === "officer") {
      navigate("/register-officer");
    } else if (selectedUserType === "official") {
      navigate("/register-official");
    }
  };

  const handleUserTypeChange = (e) => {
    setSelectedUserType(e.target.value);
  };

  if (isLoading) {
    return <LoadingAnimation message={`Logging in as ${selectedUserType}...`} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="flex font-[Quicksand] justify-center px-4 py-6">
        <div className="w-full max-w-md flex items-center flex-col">
          <div className="mb-4">
            <img
              className="h-16 w-16 object-contain"
              src="./src/assets/logo 2.png"
              alt="Swaasthyam Logo"
            />
          </div>
          <h1 className="text-blue-600 font-bold text-2xl md:text-3xl text-center">Swaasthyam</h1>
          <p className="text-gray-700 text-center text-sm md:text-base mt-2 px-4">
            Digital Health Record Management System for Migrant Workers in
            Kerala
          </p>
        </div>
      </header>

      <main className="flex justify-center px-4 pb-8">
        <article className="font-[Quicksand] w-full max-w-md">
          <div className="bg-white p-6 md:p-8 border-blue-200 border border-solid rounded-2xl shadow-xl">
            <h2 className="text-blue-600 text-center font-bold text-lg md:text-xl mb-2">
              Welcome to Swaasthyam
            </h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Secure and comprehensive health record management for migrant
              workers
            </p>
            <p className="text-blue-600 text-center font-bold text-[1rem]">
              Welcome to Swaasthyam
            </p>
            <p className="text-center text-black">
              Secure and comprehensive health record management for migrant
              workers
            </p>

            <div className="mb-6">
              <p className="font-semibold text-blue-600 mb-4">Select user type</p>
              
              <div className="space-y-3">
                <label className="flex items-center font-medium text-gray-700 cursor-pointer">
                  <input
                    className="mr-3 h-4 w-4"
                    type="radio"
                    name="role"
                    value="migrant"
                    checked={selectedUserType === "migrant"}
                    onChange={handleUserTypeChange}
                  />
                  <span>Migrant Worker</span>
                </label>

                <label className="flex items-center font-medium text-gray-700 cursor-pointer">
                  <input
                    className="mr-3 h-4 w-4"
                    type="radio"
                    name="role"
                    value="officer"
                    checked={selectedUserType === "officer"}
                    onChange={handleUserTypeChange}
                  />
                  <span>Officer (Supervisor/Healthcare/NGO)</span>
                </label>

                <label className="flex items-center font-medium text-gray-700 cursor-pointer">
                  <input
                    className="mr-3 h-4 w-4"
                    type="radio"
                    name="role"
                    value="official"
                    checked={selectedUserType === "official"}
                    onChange={handleUserTypeChange}
                  />
                  <span>Official (Government)</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-blue-600 mb-3">Login with mobile number</p>
              <input
                required
                className="w-full outline-none text-black border border-blue-200 text-sm h-12 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={handlePhoneChange}
                onPaste={handlePastePhone}
                placeholder="Enter mobile number"
              />

              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full mt-4 h-12 text-sm font-medium rounded-lg shadow-md transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                style={
                  phone.length === 10
                    ? {
                        background: "linear-gradient(90deg, #1D4ED8 0%, #000000 100%)",
                        color: "white",
                      }
                    : {
                        background: "linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)",
                        color: "white",
                        cursor: "not-allowed"
                      }
                }
                disabled={phone.length !== 10}
              >
                Send OTP
              </button>
            </div>

            {showOtp && (
              <div className="mb-6">
                <input
                  required
                  className="w-full outline-none text-black border border-blue-200 text-sm h-12 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors mb-4"
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter 6-digit OTP"
                />

                <button
                  type="button"
                  onClick={handleVerify}
                  className="w-full h-12 text-sm font-medium rounded-lg shadow-md transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  style={
                    otp.length === 6
                      ? {
                          background: "linear-gradient(90deg, #1D4ED8 0%, #000000 100%)",
                          color: "white",
                        }
                      : {
                          background: "linear-gradient(90deg, #9CA3AF 0%, #6B7280 100%)",
                          color: "white",
                          cursor: "not-allowed"
                        }
                  }
                  disabled={otp.length !== 6}
                >
                  Verify and Login
                </button>
              </div>
            )}

            {/* Alternative Login Methods */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full h-12 flex items-center justify-center border border-blue-200 rounded-lg text-sm text-gray-700 shadow-sm transition-all duration-200 hover:bg-blue-50 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <img
                  src="./src/assets/lock.png"
                  className="h-4 w-4 mr-3"
                  alt="DigiLocker"
                />
                Login with DigiLocker
              </button>

              <button
                type="button"
                className="w-full h-12 flex items-center justify-center border border-gray-300 rounded-lg text-sm text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 active:scale-98 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <img
                  src="./src/assets/qr.png"
                  className="h-4 w-4 mr-3"
                  alt="QR Code"
                />
                Scan QR code
              </button>
            </div>

            {/* QR Scanner */}
            <button
              type="button"
              className="w-full h-32 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-400 text-gray-700 bg-blue-50 transition-all duration-200 hover:bg-blue-100 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            >
              <img
                src="./src/assets/camera.png"
                className="h-8 w-8 mb-2"
                alt="Camera"
              />
              <p className="text-blue-600 font-medium">Scan QR Code</p>
              <p className="text-xs text-gray-600">Tap to activate camera scanner</p>
            </button>

            {/* Registration Button */}
            {selectedUserType !== "migrant" && (
              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full h-12 flex items-center justify-center rounded-lg border border-green-600 text-green-600 bg-green-50 font-medium shadow-sm transition-all duration-200 hover:bg-green-100 active:scale-98 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {selectedUserType === "officer"
                  ? "Register new officer"
                  : "Register new official"}
              </button>
            )}
          </div>
        </article>
      </main>
      
      {/* Footer */}
      <footer className="flex justify-center items-center gap-2 px-4 pb-6">
        <span className="text-xs px-3 py-1 rounded-full text-green-700 bg-green-100 border border-green-300">
          🔒 Secure
        </span>
        <span className="text-xs px-3 py-1 rounded-full text-blue-700 bg-blue-100 border border-blue-300">
          🏛️ Official
        </span>
        <span className="text-xs px-3 py-1 rounded-full text-gray-700 bg-gray-100 border border-gray-300">
          🏞️ Kerala Govt.
        </span>
      </footer>
    </div>
  );
};

export default LoginPage;
