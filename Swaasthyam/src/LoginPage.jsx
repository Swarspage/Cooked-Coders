import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("migrant");

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
    // TODO: call API to verify OTP
    if (selectedUserType === "officer") {
      navigate("/officer"); // go to OfficerDashboard
    } else if (selectedUserType === "official") {
      // keep current flow or send to official dashboard if available
      navigate("/register-official");
    } else {
      // migrant path not specified; send home for now
      navigate("/");
    }
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

  return (
    <>
      <header className="flex font-[Quicksand] justify-center min-w-[50px]">
        <div className=" m-0 p-[1rem] w-[50%] flex items-center flex-col">
          <div>
            <img
              className="h-[4rem] w-[4rem]"
              src="./src/assets/user.png"
              alt=""
            />
          </div>
          <p className="text-blue-600 font-bold text-[2rem]">Swaasthyam</p>
          <p className="text-back text-center ">
            Digital Health Record Management System for Migrant Workers in
            Kerala
          </p>
          <div className="p-[1rem]"></div>
        </div>
      </header>

      <div className="">
        <article className="font-[Quicksand] flex justify-center min-w-[50px]">
          <div className=" m-0 p-[2rem] w-[35%] border-blue-200 border-[1px] border-solid rounded-2xl shadow-xl flex  flex-col">
            <p className="text-blue-600 text-center font-bold text-[1rem]">
              Welcome to Swaasthyam
            </p>
            <p className="text-center text-black">
              Secure and comprehensive health record management for migrant
              workers
            </p>

            <div className="mt-[2rem]">
              <p className="font-semibold text-blue-600">Select user type</p>
            </div>

            <label className="font-semibold ">
              <input
                className=" m-[.5rem]"
                type="radio"
                name="role"
                value="migrant"
                checked={selectedUserType === "migrant"}
                onChange={handleUserTypeChange}
              />
              Migrant Worker
            </label>

            <label className="font-semibold ">
              <input
                className=" m-[.5rem]"
                type="radio"
                name="role"
                value="officer"
                checked={selectedUserType === "officer"}
                onChange={handleUserTypeChange}
              />
              Officer (Supervisor/Healthcare/NGO)
            </label>

            <label className="font-semibold ">
              <input
                className=" m-[.5rem]"
                type="radio"
                name="role"
                value="official"
                checked={selectedUserType === "official"}
                onChange={handleUserTypeChange}
              />
              Official (Government)
            </label>

            <div className="mt-[1rem] font-semibold text-blue-600">
              <p>Login with mobile number</p>
              <input
                required
                className="outline-none appearance-none text-black border-[1px] text-sm h-10 rounded-lg p-[.5rem] shadow-xs border-blue-200 border-solid w-[100%] my-[1rem]"
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
                className="w-full max-w-3xl  mx-auto h-10 text-sm flex items-center justify-center rounded-sm shadow-lg transition-transform duration-150 active:scale-95 focus:outline-none disabled:opacity-60"
                style={
                  phone.length === 10
                    ? {
                        background:
                          "linear-gradient(90deg, #1D4ED8 0%, #000000 100%)",
                        color: "white",
                      }
                    : {
                        background:
                          "linear-gradient(90deg, #6e6e6e 0%, #8f8bb8 50%, #b7a6ff 100%)",
                        color: "white",
                      }
                }
              >
                Send OTP
              </button>

              {showOtp && (
                <>
                  <input
                    required
                    className="outline-none appearance-none text-black border-[1px] text-sm h-10 rounded-lg p-[.5rem] shadow-xs border-blue-200 border-solid w-[100%] my-[1rem]"
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
                    className="w-full max-w-3xl mx-auto h-10 flex text-sm items-center justify-center rounded-sm shadow-lg transition-transform duration-150 active:scale-95 focus:outline-none disabled:opacity-60"
                    style={
                      otp.length === 6
                        ? {
                            background:
                              "linear-gradient(90deg, #1D4ED8 0%, #000000 100%)",
                            color: "white",
                          }
                        : {
                            background:
                              "linear-gradient(90deg, #6e6e6e 0%, #8f8bb8 50%, #b7a6ff 100%)",
                            color: "white",
                          }
                    }
                  >
                    Verify and Login
                  </button>
                </>
              )}

              <button
                type="button"
                className="w-full max-w-3xl my-[.5rem] mx-auto h-10 flex items-center border-blue-200 border-solid border-[1px] justify-center rounded-sm text-[.8rem] text-black shadow-lg transition-transform duration-150 active:scale-95 focus:outline-none disabled:opacity-60 hover:bg-blue-100 hover:transition-all ease-in-out  "
              >
                <img
                  src="./src/assets/lock.png"
                  className="h-[15px] w=[15px] mx-[.5rem]"
                  alt=""
                />
                Login with DigiLocker
              </button>

              <button
                type="button"
                className="w-full max-w-3xl my-[.5rem] mx-auto h-10 flex items-center justify-center rounded-sm text-[.8rem] border-black border-solid border-[1px] text-black shadow-lg transition-transform duration-150 active:scale-95 focus:outline-none disabled:opacity-60 hover:bg-blue-100 hover:transition-all ease-in-out "
              >
                <img
                  src="./src/assets/qr.png"
                  className="h-[15px] w=[15px] mx-[.5rem]"
                  alt=""
                />
                Scan QR code
              </button>

              <button
                type="button"
                className="w-full max-w-3xl my-[2rem] mx-auto h-40 flex flex-col items-center justify-center rounded-sm border-dashed border-blue-600 border-[2px] text-black shadow-lg transition-transform duration-150 active:scale-95 focus:outline-none disabled:opacity-60 bg-blue-100 p-25"
              >
                <div>
                  <img
                    src="./src/assets/camera.png"
                    className="h-[40px] w=[40px] mx-[.5rem]"
                    alt=""
                  />
                </div>
                <p className="text-blue-600 mt-[1rem]">Scan QR Code</p>
                <p className="text-sm">Tap to activate camera scanner</p>
              </button>

              {selectedUserType !== "migrant" && (
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="w-full max-w-3xl mt-[.5rem] mx-auto h-10 flex items-center justify-center rounded-sm border-green-700 border-solid border-[1px] text-green-600 shadow-lg transition-transform duration-150 active:scale-95 focus:outline-none disabled:opacity-60"
                >
                  {selectedUserType === "officer"
                    ? "Register new officer"
                    : "Register new official"}
                </button>
              )}
            </div>
          </div>
        </article>
        <div className="justify-center flex items-center m-3 gap-1">
          <button className="text-sm h-[1.5rem] px-3 rounded-sm text-green-800 border-green-700 text border-1 boeder solid">
            Secure
          </button>
          <button className="text-sm h-[1.5rem] px-3 rounded-sm text-blue-800 border-blue-900 border-1 boeder solid">
            Official
          </button>
          <button className="text-sm h-[1.5rem] px-3 rounded-sm text-gray-700 border-blue-900 border-1 border-solid">
            Kerala Govt.
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
