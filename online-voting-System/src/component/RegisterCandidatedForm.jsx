import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from './ui/FormModal';

const CreateCandidateForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    birthDate: '',
    residenceDuration: '',
    residenceUnit: 'years',
    homeNo: '',
    disability: 'None',
    disabilityType: '',
    image: null
  });
const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: 'Male',
      birthDate: '',
      residenceDuration: '',
      residenceUnit: 'years',
      homeNo: '',
      disability: 'None',
      disabilityType: '',
      image: null
    });
    // setImagePreview(null);
  };

  if (!isOpen) return null;

  return (
    <Modal title="Register New Candidate" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 overflow-hidden border border-gray-300">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <label className="cursor-pointer text-sm">
            <span className="text-purple-600 hover:text-purple-800 px-3 py-1 border border-blue-200 rounded-md">
              {imagePreview ? 'Change Photo' : 'Upload Photo'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name 
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
              required
            />
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
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name 
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        {/* Gender and Birth Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender 
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Date 
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        {/* Residence Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration of Residence 
            </label>
            <div className="flex">
              <input
                type="number"
                name="residenceDuration"
                value={formData.residenceDuration}
                onChange={handleChange}
                className="w-3/4 p-2 text-sm border border-gray-300 rounded-l-md focus:ring-1 focus:ring-purple-500"
                required
              />
              <select
                name="residenceUnit"
                value={formData.residenceUnit}
                onChange={handleChange}
                className="w-1/4 p-2 text-sm border border-l-0 border-gray-300 rounded-r-md focus:ring-1 focus:ring-purple-500"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Number
            </label>
            <input
              type="text"
              name="homeNo"
              value={formData.homeNo}
              onChange={handleChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
            />
          </div>
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
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 mb-2"
            required
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
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
                placeholder="Specify disability type"
              />
            </div>
          )}
        </div>
        {/* Form Actions */}
        <div className="justify-self-end space-x-3 pt-4 border-t border-gray-200 mt-6">
          <button 
            type="submit"
            className="px-4 py-2 text-sm bg-purple-800 text-white rounded-md hover:bg-purple-600"
          >
            Save Candidate
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateCandidateForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default CreateCandidateForm;