import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from './ui/FormModal';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EditCandidateForm = ({ isOpen, onClose, candidate, onSuccess }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
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
    }
  });

  const disabilityStatus = watch('disability');

  useEffect(() => {
    if (candidate) {
      reset({
        firstName: candidate.first_name || '',
        middleName: candidate.middle_name || '',
        lastName: candidate.last_name || '',
        gender: candidate.gender || 'Male',
        birthDate: candidate.birth_date || '',
        residenceDuration: candidate.residence_duration || '',
        residenceUnit: candidate.residence_unit || 'years',
        homeNo: candidate.home_no || '',
        disability: candidate.disability || 'None',
        disabilityType: candidate.disability_type || '',
        image: null
      });
      
      if (candidate.image_url) {
        setImagePreview(candidate.image_url);
      }
    }
  }, [candidate, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('first_name', data.firstName);
      formData.append('middle_name', data.middleName);
      formData.append('last_name', data.lastName);
      formData.append('gender', data.gender);
      formData.append('birth_date', data.birthDate);
      formData.append('residence_duration', data.residenceDuration);
      formData.append('residence_unit', data.residenceUnit);
      formData.append('home_no', data.homeNo);
      formData.append('disability', data.disability);
      formData.append('disability_type', data.disabilityType);
      if (data.image) {
        formData.append('image', data.image);
      }

      await axios.put(`http://127.0.0.1:8000/api/candidate/${candidate.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update candidate');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Edit Candidate" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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
              {...register('firstName', { required: 'First name is required' })}
              className={`w-full p-2 text-sm border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-1 focus:ring-purple-500`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              type="text"
              {...register('middleName')}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name 
            </label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className={`w-full p-2 text-sm border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-1 focus:ring-purple-500`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Gender and Birth Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender 
            </label>
            <select
              {...register('gender')}
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500"
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
              {...register('birthDate', { required: 'Birth date is required' })}
              className={`w-full p-2 text-sm border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-1 focus:ring-purple-500`}
            />
            {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>}
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
                {...register('residenceDuration', { required: 'Residence duration is required' })}
                className={`w-3/4 p-2 text-sm border ${errors.residenceDuration ? 'border-red-500' : 'border-gray-300'} rounded-l-md focus:ring-1 focus:ring-purple-500`}
              />
              <select
                {...register('residenceUnit')}
                className="w-1/4 p-2 text-sm border border-l-0 border-gray-300 rounded-r-md focus:ring-1 focus:ring-purple-500"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
            {errors.residenceDuration && <p className="text-red-500 text-xs mt-1">{errors.residenceDuration.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Number
            </label>
            <input
              type="text"
              {...register('homeNo')}
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
            {...register('disability')}
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 mb-2"
          >
            <option value="None">No Disability</option>
            <option value="Visual">Visual Impairment</option>
            <option value="Hearing">Hearing Impairment</option>
            <option value="Physical">Physical Disability</option>
            <option value="Intellectual">Intellectual Disability</option>
            <option value="Other">Other</option>
          </select>
          
          {disabilityStatus !== 'None' && (
            <div className="mt-2">
              <input
                type="text"
                {...register('disabilityType')}
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
            disabled={isSubmitting}
            className="px-4 py-2 text-sm bg-purple-800 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update Candidate'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

EditCandidateForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  candidate: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

export default EditCandidateForm;