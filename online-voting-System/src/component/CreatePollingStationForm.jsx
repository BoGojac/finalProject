import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from './ui/FormModal';
import useRegionConstituencyStore from '../store/regionConstituencyStore';

const pollingStationSchema = z.object({
  name: z.string().min(1, 'Polling station name is required'),
  constituency_id: z.string().min(1, 'Constituency is required'), // 👈 updated name
  longitude: z.string().min(1, 'Longitude is required'),
  latitude: z.string().min(1, 'Latitude is required')
});

const CreatePollingStationForm = ({ isOpen, onClose, onSuccess }) => {
  const {
    regions,
    fetchRegionsAndConstituencies,
    selectedRegion,
    filteredConstituencies,
    setSelectedRegion
  } = useRegionConstituencyStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(pollingStationSchema)
  });

  useEffect(() => {
    fetchRegionsAndConstituencies();
  }, [fetchRegionsAndConstituencies]);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('constituency_id', data.constituency_id);
      formData.append('longitude', data.longitude);
      formData.append('latitude', data.latitude);

      const response = await axios.post('http://127.0.0.1:8000/api/pollingstation', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });

      onSuccess(response.data);
      reset();
      onClose();
    } catch (error) {
      setError('root', {
        message: error.response?.data?.message || 'Failed to create polling station'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Add Polling Station" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Station Name</label>
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
            value={selectedRegion}
            onChange={handleRegionChange}
            className="w-full border rounded h-10 px-2"
          >
            <option value="">-- Select a Region --</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Constituency</label>
          <select
            {...register('constituency_id')}
            required
            disabled={!selectedRegion}
            className={`w-full border rounded h-10 px-2 ${
              errors.constituency_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- Select a Constituency --</option>
            {filteredConstituencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.constituency_id && (
            <p className="text-xs text-red-500">{errors.constituency_id.message}</p>
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
            {isSubmitting ? 'Submitting...' : 'Add Polling Station'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreatePollingStationForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default CreatePollingStationForm;
