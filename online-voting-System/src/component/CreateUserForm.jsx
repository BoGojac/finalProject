// import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateUserForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    password_confirmation: '',
    role: '',
    constituencyName: '',
    pollingStationName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Icy Glass Overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Glass Card - Adjusted width for different screens */}
      <div className="relative z-50 w-full max-w-md md:max-w-xl lg:max-w-3xl bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl border border-white/30 overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Create User</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="text-[#6B4AA0] focus:ring-[#6B4AA0]"
                    required
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="text-[#6B4AA0] focus:ring-[#6B4AA0]"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                required
              />
            </div>

            {/* Account Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                required
              />
            </div>

            {/* Role Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Board Manager">Board Manager</option>
                <option value="Constituency Staff">Constituency Staff</option>
                <option value="Polling Station Staff">Polling Station Staff</option>
              </select>
            </div>

            {/* Conditional Fields - Wider display for these inputs */}
            {formData.role === 'Constituency Staff' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Constituency Name</label>
                <input
                  type="text"
                  name="constituencyName"
                  value={formData.constituencyName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                  required={formData.role === 'Constituency Staff'}
                />
              </div>
            )}

            {formData.role === 'Polling Station Staff' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Polling Station Name</label>
                <input
                  type="text"
                  name="pollingStationName"
                  value={formData.pollingStationName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
                  required={formData.role === 'Polling Station Staff'}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#6B4AA0]/90 text-white hover:bg-[#5a3b91] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:ring-opacity-50"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateUserForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateUserForm;