// src/components/EditRegionForm.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './ui/FormModal';

const regionSchema = z.object({
  name: z.string().min(1, 'Region name is required'),
  abbreviation: z.string().min(1, 'Abbreviation is required'),
});

const EditRegionForm = ({ isOpen, onClose, onSuccess, region }) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(regionSchema),
  });

  // Populate form fields when `region` changes
  useEffect(() => {
    if (region) {
      setValue('name', region.name);
      setValue('abbreviation', region.abbreviation);
    }
  }, [region, setValue]);

  const onSubmit = async (data) => {
    // You can use FormData or just send JSON directly
    const payload = {
      name: data.name,
      abbreviation: data.abbreviation, 
    };

    try {
      // Using PUT directly is simpler than sending _method override
      const response = await axios.put(
        `http://127.0.0.1:8000/api/regions/${region.id}`,
        payload,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      onSuccess(response.data.data); // <-- Use 'data' from Laravel response
      onClose();
    } catch (error) {
      setError('root', {
        message: error.response?.data?.message || 'Failed to update region',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Edit Region" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Region Name
          </label>
          <input
            type="text"
            {...register('name')}
            className={`mt-1 block w-full rounded-md border text-md h-10 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Abbreviation
          </label>
          <input
            type="text"
            {...register('abbreviation')}
            className={`mt-1 block w-full rounded-md border text-md h-10 ${
              errors.abbreviation ? 'border-red-500' : 'border-gray-300'
            } shadow focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.abbreviation && (
            <p className="text-xs text-red-500 mt-1">
              {errors.abbreviation.message}
            </p>
          )}
        </div>

        {errors.root && (
          <p className="text-xs text-red-500 mt-1">{errors.root.message}</p>
        )}

        <div className="pt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-800 rounded-md text-sm font-medium text-white hover:bg-purple-600"
          >
            {isSubmitting ? 'Updating...' : 'Update Region'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

EditRegionForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  region: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired,
  }),
};

export default EditRegionForm;
