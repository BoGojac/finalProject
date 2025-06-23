import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from './ui/FormModal';
import useRegionStore from '../store/regionStore';

const partySchema = z.object({
  name: z.string().min(1, 'Party name is required'), 
  abbrevation: z.string().min(1, 'Abbreviation is required'),
  leader: z.string().min(1, 'Leader is required'),
  foundation_year: z.string().min(1, 'Founding year is required'),
  headquarters: z.string().min(1, 'Headquarters is required'),
  participation_area: z.enum(['national', 'regional']),
  region_id: z.string().optional(),
});

const CreatePartyForm = ({ isOpen, onClose, onSuccess }) => {
  const { regions, fetchRegions } = useRegionStore();
  const [fileError, setFileError] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(partySchema),
    defaultValues: {
      participation_area: 'national',
    },
  });

  const watchParticipation = watch('participation_area');

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  const onSubmit = async (data) => {
    if (watchParticipation === 'regional' && !data.region_id) {
      setError('region_id', { message: 'Region is required for regional parties' });
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'region_id' && watchParticipation !== 'regional') return;
      formData.append(key, value);
    });

    if (logoFile) {
      formData.append('image', logoFile);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/party', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      onSuccess(response.data.party);
      reset();
      setLogoFile(null);
      onClose();
    } catch (error) {
      setError('root', {
        message: error.response?.data?.message || 'Failed to register party',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Register New Party" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Party Name</label>
          <input
            type="text"
            {...register('name')}
            className={`w-full border rounded h-10 px-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Abbreviation</label>
            <input
              type="text"
              {...register('abbrevation')}
              className={`w-full border rounded h-10 px-2 ${errors.abbrevation ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.abbrevation && <p className="text-xs text-red-500">{errors.abbrevation.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Leader</label>
            <input
              type="text"
              {...register('leader')}
              className={`w-full border rounded h-10 px-2 ${errors.leader ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.leader && <p className="text-xs text-red-500">{errors.leader.message}</p>}
          </div>
        </div> 

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Founding Year</label>
            <input
              type="date"
              {...register('foundation_year')}
              className={`w-full border rounded h-10 px-2 ${errors.foundation_year ? 'border-red-500' : 'border-gray-300'}`}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.foundation_year && <p className="text-xs text-red-500">{errors.foundation_year.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Headquarters</label>
            <input
              type="text"
              {...register('headquarters')}
              className={`w-full border rounded h-10 px-2 ${errors.headquarters ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.headquarters && <p className="text-xs text-red-500">{errors.headquarters.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Participation Area</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="national"
                {...register('participation_area')}
                className="form-radio"
              />
              <span className="ml-2">National</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="regional"
                {...register('participation_area')}
                className="form-radio"
              />
              <span className="ml-2">Regional</span>
            </label>
          </div>
        </div>

        {watchParticipation === 'regional' && (
          <div>
            <label className="block text-sm font-medium">Region</label>
            <select
              {...register('region_id')}
              className={`w-full border rounded h-10 px-2 ${errors.region_id ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.region_id && <p className="text-xs text-red-500">{errors.region_id.message}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Party Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && !file.type.startsWith('image/')) {
                setFileError('Please upload a valid image');
                return;
              }
              setFileError('');
              setLogoFile(file);
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {fileError && <p className="text-xs text-red-500">{fileError}</p>}
        </div>

        {errors.root && <p className="text-xs text-red-500">{errors.root.message}</p>}

        <div className="text-right pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-600"
          >
            {isSubmitting ? 'Submitting...' : 'Register Party'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreatePartyForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CreatePartyForm;
