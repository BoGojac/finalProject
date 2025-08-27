import { useEffect } from 'react';
import Modal from './ui/FormModal';
import useRegionConstituencyStore from '../store/regionConstituencyStore'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import PropTypes from 'prop-types';
import useAuthStore from '../store/authStore';



// Validation schema
const pollingStationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  region_id: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().min(1, 'Region is required')),
  constituency_id: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().min(1, 'Constituency is required')),
  longitude: z.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude'),
  latitude: z.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude')
});

const EditPollingStationForm = ({ isOpen, onClose, onSuccess, pollingStation }) => {
  const {
  regions,
  filteredConstituencies,
  fetchRegionsAndConstituencies,
  setSelectedRegion,
} = useRegionConstituencyStore();


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(pollingStationSchema)
  });

  const selectedRegionId = watch('region_id');

  useEffect(() => {
  fetchRegionsAndConstituencies();
}, []);


  useEffect(() => {
  if (pollingStation) {
    if (pollingStation.name) setValue('name', pollingStation.name);
    if (pollingStation.region_id) {
      setValue('region_id', pollingStation.region_id);
      setSelectedRegion(pollingStation.region_id); // <-- use this instead
    }
    if (pollingStation.constituency_id) setValue('constituency_id', pollingStation.constituency_id);
    if (pollingStation.longitude) setValue('longitude', parseFloat(pollingStation.longitude));
    if (pollingStation.latitude) setValue('latitude', parseFloat(pollingStation.latitude));
  }
}, [pollingStation, setValue, setSelectedRegion]);


  const onSubmit = async (data) => {
    const { token } = useAuthStore.getState();
    try {
      await axios.put(`http://127.0.0.1:8000/api/pollingstation/${pollingStation.id}`, {
        ...data,
        longitude: data.longitude.toString(),
        latitude: data.latitude.toString()
      }, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      onSuccess(); // refresh list
      onClose();   // close modal
      reset();     // reset form state
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
    }
  };

  if (!isOpen || !pollingStation) return null;

  return (
    <Modal title="Edit Polling Station" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Station Name</label>
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
            {regions?.map((region) => (
                <option key={region.id} value={region.id}>
                    {region.name}
                </option>
            ))}
          </select>
          {errors.region_id && <p className="text-xs text-red-500 mt-1">{errors.region_id.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Constituency</label>
          <select
            {...register('constituency_id')}
            disabled={!selectedRegionId}
            className={`mt-1 block w-full rounded-md border text-md h-10 px-3 ${
              errors.constituency_id ? 'border-red-500' : 'border-gray-300'
            } focus:border-purple-500 focus:ring-purple-500`}
          >
            <option value="">-- Select a Constituency --</option>
            {filteredConstituencies.map((constituency) => (
                <option key={constituency.id} value={constituency.id}>
                    {constituency.name}
                </option>
            ))}

          </select>
          {errors.constituency_id && <p className="text-xs text-red-500 mt-1">{errors.constituency_id.message}</p>}
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
            {isSubmitting ? 'Updating...' : 'Update Station'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

EditPollingStationForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  pollingStation: PropTypes.object
};

export default EditPollingStationForm;