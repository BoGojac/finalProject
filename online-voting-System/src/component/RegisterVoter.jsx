import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from './ui/FormModal';

const RegisterVoterForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    disability: 'None',
    disabilityType: '',
    residenceDuration: '',
    residenceUnit: 'years',
    homeNo: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    
    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Residence duration validation
    if (!formData.residenceDuration) {
      newErrors.residenceDuration = 'Duration is required';
    } else if (formData.residenceUnit === 'months' && parseInt(formData.residenceDuration) < 6) {
      newErrors.residenceDuration = 'Must be at least 6 months';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const voterData = {
      ...formData,
      name: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`.trim(),
      duration_of_residence: `${formData.residenceDuration} ${formData.residenceUnit}`
    };

    onSubmit(voterData);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      birthDate: '',
      disability: 'None',
      disabilityType: '',
      residenceDuration: '',
      residenceUnit: 'years',
      homeNo: '',
      phone: '',
      email: ''
    });
  };

  if (!isOpen) return null;

  return (
    <Modal title="Register New Voter" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full p-2 text-sm border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-2 text-sm border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birth Date *
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className={`w-full p-2 text-sm border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
        </div>

        {/* Disability Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Disability Status
          </label>
          <select
            name="disability"
            value={formData.disability}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-md mb-2"
          >
            <option value="None">No Disability</option>
            <option value="Visual">Visual Impairment</option>
            <option value="Hearing">Hearing Impairment</option>
            <option value="Physical">Physical Disability</option>
            <option value="Intellectual">Intellectual Disability</option>
            <option value="Other">Other</option>
          </select>
          
          {formData.disability !== 'None' && (
            <div className="mt-2">
              <input
                type="text"
                name="disabilityType"
                value={formData.disabilityType}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded-md"
                placeholder="Specify disability type"
              />
            </div>
          )}
        </div>

        {/* Residence Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration of Residence *
          </label>
          <div className="flex">
            <input
              type="number"
              name="residenceDuration"
              value={formData.residenceDuration}
              onChange={handleChange}
              min={formData.residenceUnit === 'months' ? 6 : 1}
              className={`w-3/4 p-2 text-sm border ${errors.residenceDuration ? 'border-red-500' : 'border-gray-300'} rounded-l-md`}
              placeholder={formData.residenceUnit === 'months' ? 'Minimum 6' : ''}
            />
            <select
              name="residenceUnit"
              value={formData.residenceUnit}
              onChange={handleChange}
              className="w-1/4 p-2 text-sm border border-l-0 border-gray-300 rounded-r-md"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
          {errors.residenceDuration && <p className="text-red-500 text-xs mt-1">{errors.residenceDuration}</p>}
        </div>

        {/* Home Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Home Number
          </label>
          <input
            type="text"
            name="homeNo"
            value={formData.homeNo}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-md"
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 text-sm border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 text-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Form Actions */}
        <div className="justify-self-end space-x-3 pt-4 border-t border-gray-200 mt-6">
          <button 
            type="submit"
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Register Voter
          </button>
        </div>
      </form>
    </Modal>
  );
};

RegisterVoterForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterVoterForm;