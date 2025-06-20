import { useEffect } from 'react';
import Modal from './ui/FormModal';
import useRegionStore from '../store/regionStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import PropTypes from 'prop-types';

// Validation schema
const constituencySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  region_id: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().min(1, 'Region is required')),
  longitude: z.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude'),
  latitude: z.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude')
});

const EditConstituencyForm = ({ isOpen, onClose, onSuccess, constituency }) => {
  const { regions, fetchRegions } = useRegionStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(constituencySchema)
  });

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  useEffect(() => {
    if (constituency) {
      setValue('name', constituency.name);
      setValue('region_id', constituency.region_id);
      setValue('longitude', parseFloat(constituency.longitude));
      setValue('latitude', parseFloat(constituency.latitude));
    }
  }, [constituency, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/constituency/${constituency.id}`, {
        ...data,
        longitude: data.longitude.toString(),
        latitude: data.latitude.toString()
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      onSuccess(); // refresh list
      onClose();   // close modal
      reset();     // reset form state
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
    }
  };

  if (!isOpen || !constituency) return null;

  return (
    <Modal title="Edit Constituency" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register('name')}
            className={`mt-1 block w-full rounded-md border text-md h-10 px-3 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:border-purple-500 focus:ring-purple-500`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <select
            {...register('region_id')}
            className={`mt-1 block w-full rounded-md border text-md h-10 px-3 ${
              errors.region_id ? 'border-red-500' : 'border-gray-300'
            } focus:border-purple-500 focus:ring-purple-500`}
          >
            <option value="">-- Select a Region --</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          {errors.region_id && <p className="text-xs text-red-500 mt-1">{errors.region_id.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              step="any"
              {...register('longitude', { valueAsNumber: true })}
              className={`mt-1 block w-full rounded-md border text-md h-10 px-3 ${
                errors.longitude ? 'border-red-500' : 'border-gray-300'
              } focus:border-purple-500 focus:ring-purple-500`}
            />
            {errors.longitude && <p className="text-xs text-red-500 mt-1">{errors.longitude.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              step="any"
              {...register('latitude', { valueAsNumber: true })}
              className={`mt-1 block w-full rounded-md border text-md h-10 px-3 ${
                errors.latitude ? 'border-red-500' : 'border-gray-300'
              } focus:border-purple-500 focus:ring-purple-500`}
            />
            {errors.latitude && <p className="text-xs text-red-500 mt-1">{errors.latitude.message}</p>}
          </div>
        </div>

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
            className="px-4 py-2 bg-purple-800 rounded-md text-sm font-medium text-white hover:bg-purple-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update Constituency'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

EditConstituencyForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  constituency: PropTypes.object
};

export default EditConstituencyForm;
