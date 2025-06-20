// src/components/AddRegionForm.jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './ui/FormModal';

const regionSchema = z.object({
  name: z.string().min(1, 'Region name is required'),
  abbreviation: z.string().min(1, 'Abbreviation is required')
});

const AddRegionForm = ({ isOpen, onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(regionSchema)
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('abbreviation', data.abbreviation); // Match backend spelling

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/regions',
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
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
