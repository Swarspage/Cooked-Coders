import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const OfficialRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    permanentAddress: "",
    currentAddress: "",
    idProofType: "",
    idProofNumber: "",
    idDocument: null,
    
    // Official Info
    department: "",
    designation: "",
    workLocation: "",
    emergencyContact: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      idDocument: file,
    }));
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Official registration data:", formData);
    alert("Official registration submitted successfully!");
  };

  return (
    <div className="flex font-[Quicksand] justify-center min-w-[50px] min-h-screen bg-gray-50">
      <div className="m-0 p-[2rem] w-[90%] max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                Personal Information
              </h3>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter middle name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="dd-mm-yyyy"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              {/* Addresses */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.permanentAddress}
                  onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter permanent address"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.currentAddress}
                  onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter current address"
                  required
                />
              </div>

              {/* ID Proof */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.idProofType}
                    onChange={(e) => handleInputChange("idProofType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select ID Proof</option>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="voter">Voter ID</option>
                    <option value="pan">PAN Card</option>
                    <option value="passport">Passport</option>
                    <option value="driving">Driving License</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.idProofNumber}
                    onChange={(e) => handleInputChange("idProofNumber", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter ID number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Official Information Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                Official Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter department"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter designation"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.workLocation}
                  onChange={(e) => handleInputChange("workLocation", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter work location"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter emergency contact"
                />
              </div>
            </div>

            {/* Upload Document */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileUpload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <div className="text-gray-400">
                    Choose File {formData.idDocument ? formData.idDocument.name : "No file chosen"}
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-all"
              >
                Back to Login
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Submit & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficialRegistration;
