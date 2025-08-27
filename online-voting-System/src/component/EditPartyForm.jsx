import { useEffect } from 'react';
import Modal from './ui/FormModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import usePartyStore from '../store/partyStore';
import useRegionStore from '../store/regionStore';
import axios from 'axios';
import useAuthStore from '../store/authStore';

const partySchema = z.object({
  name: z.string().min(1, 'Party name is required'),
  abbrevation: z.string().min(1, 'Abbreviation is required'),
  leader: z.string().min(1, 'Leader is required'),
  foundation_year: z.string()
  .min(1, 'Foundation year is required')
  .refine(val => !isNaN(Date.parse(val)), 'Invalid date format')
  .refine(val => {
    const inputDate = new Date(val);
    const today = new Date();
    return inputDate <= today; // Cannot be in the future
  }, 'Foundation year must not be in the future'),
  headquarters: z.string().min(1, 'Headquarters is required'),
  participation_area: z.enum(['national', 'regional']),
  region_id: z.string().optional(),
  logo: z.any().optional(),
});

const EditPartyForm = () => {
  const {
    isEditFormOpen,
    selectedParty,
    closeEditForm,
    fetchParties,
    clearError,
  } = usePartyStore();

  const { regions, fetchRegions } = useRegionStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(partySchema),
  });

  const participationArea = watch('participation_area');

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  useEffect(() => {
    if (selectedParty) {
      reset({
        ...selectedParty,
        region_id: selectedParty.region_id ? String(selectedParty.region_id) : '',
        logo: null,
      });
    }
  }, [selectedParty, reset]);

  const onSubmit = async (data) => {
    const { token } = useAuthStore.getState();
    try {
      clearError();

      const payload = new FormData();

      // Always send all required text fields
      payload.append('name', data.name);
      payload.append('abbrevation', data.abbrevation);
      payload.append('leader', data.leader);
      payload.append('foundation_year', data.foundation_year);
      payload.append('headquarters', data.headquarters);
      payload.append('participation_area', data.participation_area);

    
        // ✅ FIXED VERSION (ONLY send region_id if it has a real value)
        if (data.participation_area === 'regional' && data.region_id) {
          payload.append('region_id', data.region_id);
        }


      // Add image file if selected
      if (data.logo instanceof File) {
        payload.append('image', data.logo);
      }
       for (const [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }
      payload.append('_method', 'PUT');  // add this to override HTTP method

      await axios.post(
        `http://127.0.0.1:8000/api/party/${selectedParty.id}`,
        payload,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Accept' : 'application-json',
            Authorization: `Bearer ${token}`
           },
        }
      );

      await fetchParties();
      closeEditForm();
      reset();
    } catch (err) {
        console.error('Update error:', err.response?.data);

        const msg = err.response?.data?.message || 'Failed to update party';

        if (err.response?.data?.errors) {
          Object.entries(err.response.data.errors).forEach(([field, messages]) => {
            setError(field, { type: 'manual', message: messages[0] });
          });
        } else {
          setError('root', { type: 'manual', message: msg });
        }
      }

  };


  if (!isEditFormOpen || !selectedParty) return null;

  return (
    <Modal title="Edit Party" onClose={closeEditForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Party Name</label>
          <input {...register('name')} className={`form-input h-10 w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Abbreviation</label>
            <input {...register('abbrevation')} className={`form-input h-10 w-full rounded-md border ${errors.abbrevation ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.abbrevation && <p className="text-red-500 text-sm">{errors.abbrevation.message}</p>}
          </div>
          <div>
            <label className="block">Leader</label>
            <input {...register('leader')} className={`form-input h-10 w-full rounded-md border ${errors.leader ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.leader && <p className="text-red-500 text-sm">{errors.leader.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Foundation Year</label>
            <input
              type="date"
              max={new Date().toISOString().split('T')[0]} // Cannot select future date
              {...register('foundation_year')}
              className={`w-full border rounded h-10 px-2 ${
                errors.foundation_year ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.foundation_year && (
              <p className="text-red-500 text-sm">{errors.foundation_year.message}</p>
            )}
          </div>
          <div>
            <label className="block">Headquarters</label>
            <input {...register('headquarters')} className={`form-input h-10 w-full rounded-md border ${errors.headquarters ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.headquarters && <p className="text-red-500 text-sm">{errors.headquarters.message}</p>}
          </div>
        </div>

        <div>
          <label className="block">Participation Area</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" value="national" {...register('participation_area')} className="accent-purple-600 w-5 h-5 form-radio"/>
              <span className="ml-2">National</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="regional" {...register('participation_area')} className="form-radio accent-purple-600 w-5 h-5" />
              <span className="ml-2">Regional</span>
            </label>
          </div>
        </div>

        {participationArea === 'regional' && (
          <div>
            <label className="block">Region</label>
            <select {...register('region_id')} className={`form-select w-full h-10 rounded-md border ${errors.region_id ? 'border-red-500' : 'border-gray-300'}`}>
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region.id} value={String(region.id)}>{region.name}</option>
              ))}
            </select>
            {errors.region_id && <p className="text-red-500 text-sm">{errors.region_id.message}</p>}
          </div>
        )}

        <div>
          <label className="block">Party Logo</label>
          <input type="file" {...register('logo')} className="form-input w-full rounded-md border h-10" accept="image/*" />
        </div>

        {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}

        <div className="pt-4 flex justify-end space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update Party'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPartyForm;
