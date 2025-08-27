// src/components/AddRegionForm.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './ui/FormModal';
import useVotingDateStore from '../store/votingDateStore';
import useAuthStore from '../store/authStore';

const regionSchema = z.object({
  name: z.string().min(1, 'Region name is required'),
  abbreviation: z.string().min(1, 'Abbreviation is required'),
  voting_date_id: z.string().nonempty('Voting date is required'),
});

const AddRegionForm = ({ isOpen, onClose, onSuccess }) => {

  const { votingDates, fetchVotingDates } = useVotingDateStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(regionSchema)
  });

  useEffect(() => {
  fetchVotingDates();
}, [fetchVotingDates]);


  const onSubmit = async (data) => {
     const { token } = useAuthStore.getState();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('abbreviation', data.abbreviation); 
    formData.append('voting_date_id', data.voting_date_id);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/regions',
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      onSuccess(response.data.region);
      reset();
      onClose();
    } catch (error) {
      setError('root', {
        message: error.response?.data?.message || 'Failed to add region'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Register New Region" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Region Name</label>
          <input
            type="text"
            {...register('name')}
            className={`mt-1 block w-full rounded-md border text-md h-10 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }  focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Abbreviation</label>
          <input
            type="text"
            {...register('abbreviation')}
            className={`mt-1 block w-full rounded-md border text-md h-10 ${
              errors.abbreviation ? 'border-red-500' : 'border-gray-300'
            } shadow focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.abbreviation && (
            <p className="text-xs text-red-500 mt-1">{errors.abbreviation.message}</p>
          )}
        </div>

        {/* Voting Date Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Voting Date</label>
          <select
            {...register('voting_date_id')}
            className={`w-full border rounded h-10 px-2 ${
              errors.voting_date_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Voting Date</option>
              {Array.isArray(votingDates) &&
                votingDates.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
              ))}
          </select>
          {errors.voting_date_id && (
            <p className="text-red-500 text-sm">{errors.voting_date_id.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-xs text-red-500 mt-1">{errors.root.message}</p>
        )}
 
        <div className="pt-4 text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-800 rounded-md text-sm font-medium text-white hover:bg-purple-600"
          >
            {isSubmitting ? 'Submitting...' : 'Add Region'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

AddRegionForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default AddRegionForm;
