import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from './ui/FormModal'; 
import useRegionStore from '../store/regionStore';

const constituencySchema = z.object({
  name: z.string().min(1, 'Constituency name is required'),
  region_id: z.string().min(1, 'Region is required'),
  longitude: z.string().min(1, 'Longitude is required'),
  latitude: z.string().min(1, 'Latitude is required')
});

const CreateConstituencyForm = ({ isOpen, onClose, onSuccess }) => {
  const { regions, fetchRegions } = useRegionStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(constituencySchema)
  });

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]); 

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('region_id', data.region_id);
    formData.append('longitude', data.longitude);
    formData.append('latitude', data.latitude);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/constituency', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      onSuccess(response.data.constituency);
      reset();
      onClose();
    } catch (error) {
      setError('root', {
        message: error.response?.data?.message || 'Failed to create constituency'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Add Constituency" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            {...register('name')}
            className={`w-full border rounded h-10 px-2 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Region</label>
          <select
            {...register('region_id')}
            className={`w-full border rounded h-10 px-2 ${
              errors.region_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- Select a Region --</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          {errors.region_id && (
            <p className="text-xs text-red-500">{errors.region_id.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            {...register('longitude')}
            className={`w-full border rounded h-10 px-2 ${
              errors.longitude ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            {...register('latitude')}
            className={`w-full border rounded h-10 px-2 ${
              errors.latitude ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>

        {errors.root && <p className="text-xs text-red-500">{errors.root.message}</p>}

        <div className="text-right pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-600"
          >
            {isSubmitting ? 'Submitting...' : 'Add Constituency'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateConstituencyForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default CreateConstituencyForm;
