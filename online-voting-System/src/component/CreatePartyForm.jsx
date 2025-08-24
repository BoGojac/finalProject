import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './ui/FormModal';
import useRegionStore from '../store/regionStore';
import useVotingDateStore from '../store/votingDateStore';
import usePartyStore from '../store/partyStore';

const partySchema = z.object({
  name: z.string()
    .min(1, 'Party name is required')
    .max(100, 'Party name must be less than 100 characters'),
  abbrevation: z.string()
    .min(1, 'Abbreviation is required')
    .max(10, 'Abbreviation must be less than 10 characters'),
  leader: z.string()
    .min(1, 'Leader is required')
    .max(100, 'Leader name must be less than 100 characters'),
  foundation_year: z.string()
  .min(1, 'Foundation year is required')
  .refine(val => !isNaN(Date.parse(val)), 'Invalid date format')
  .refine(val => {
    const inputDate = new Date(val);
    const today = new Date();
    return inputDate <= today; // Cannot be in the future
  }, 'Foundation year must not be in the future'),
  voting_date_id: z.string().min(1, 'Voting date is required'),
  headquarters: z.string()
    .min(1, 'Headquarters is required')
    .max(200, 'Headquarters must be less than 200 characters'),
  participation_area: z.enum(['national', 'regional']),
  region_id: z.string().optional(),
  logo: z.instanceof(FileList).optional()
}).superRefine((data, ctx) => {
  if (data.participation_area === 'regional' && !data.region_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Region is required for regional parties',
      path: ['region_id']
    });
  }
});
 
const CreatePartyForm = ({ isOpen, onClose }) => {
  const { fetchRegions } = useRegionStore();
  const { fetchVotingDates } = useVotingDateStore();
  const { fetchParties } = usePartyStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: zodResolver(partySchema),
    defaultValues: {
      participation_area: 'national',
      foundation_year: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        .toISOString().split('T')[0]
    }
  });

  const participationArea = watch('participation_area');

  useEffect(() => {
    if (isOpen) {
      fetchRegions();
      fetchVotingDates();
      setError(null);
      setSuccessMessage(null);
      setSelectedFile(null);
      reset();
    }
  }, [isOpen, fetchRegions, fetchVotingDates, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileList = new DataTransfer();
      fileList.items.add(file);
      setValue('logo', fileList.files);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    formData.append('name', data.name);
    formData.append('abbrevation', data.abbrevation);
    formData.append('leader', data.leader);
    formData.append('foundation_year', new Date(data.foundation_year).toISOString().split('T')[0]);
    formData.append('headquarters', data.headquarters);
    formData.append('participation_area', data.participation_area);
    formData.append('voting_date_id', data.voting_date_id);
    
    if (data.participation_area === 'regional' && data.region_id) {
      formData.append('region_id', data.region_id);
    }

    if (selectedFile) {
      formData.append('image', selectedFile, selectedFile.name);
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await axios.post('http://127.0.0.1:8000/api/party', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      setSuccessMessage('Party created successfully');
      await fetchParties();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      let errorMessage = 'Failed to create party';
      if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors).flat().join(', ');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const { regions } = useRegionStore.getState();
  const { votingDates } = useVotingDateStore.getState();

  return (
    <Modal title="Register New Party" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Party Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Name*</label>
          <input
            type="text"
            {...register('name')}
            className={`mt-1 block w-full rounded-md border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-purple-500 focus:ring-purple-500 h-10 px-3`}
            placeholder="Enter party name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Abbreviation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Abbreviation*</label>
            <input
              type="text"
              {...register('abbrevation')}
              className={`mt-1 block w-full rounded-md border ${
                errors.abbrevation ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-purple-500 focus:ring-purple-500 h-10 px-3`}
              placeholder="e.g., DPP"
            />
            {errors.abbrevation && (
              <p className="mt-1 text-sm text-red-600">{errors.abbrevation.message}</p>
            )}
          </div>

          {/* Leader */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Leader*</label>
            <input
              type="text"
              {...register('leader')}
              className={`mt-1 block w-full rounded-md border ${
                errors.leader ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-purple-500 focus:ring-purple-500 h-10 px-3`}
              placeholder="Party leader name"
            />
            {errors.leader && (
              <p className="mt-1 text-sm text-red-600">{errors.leader.message}</p>
            )}
          </div>
        </div>
 
        <div className="grid grid-cols-2 gap-4">
          {/* Foundation Year */}
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

          {/* Headquarters */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Headquarters*</label>
            <input
              type="text"
              {...register('headquarters')}
              className={`mt-1 block w-full rounded-md border ${
                errors.headquarters ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-purple-500 focus:ring-purple-500 h-10 px-3`}
              placeholder="Party headquarters location"
            />
            {errors.headquarters && (
              <p className="mt-1 text-sm text-red-600">{errors.headquarters.message}</p>
            )}
          </div>
        </div>

        {/* Participation Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Participation Area*</label>
          <div className="mt-1 flex gap-4">
            {['national', 'regional'].map((type) => (
              <label key={type} className="inline-flex items-center">
                <input
                  type="radio"
                  value={type}
                  {...register('participation_area')}
                  className="text-purple-600 focus:ring-purple-500 border-gray-300 accent-purple-600 w-5 h-5"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Region (conditional) */}
        {participationArea === 'regional' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Region*</label>
            <select
              {...register('region_id')}
              className={`mt-1 block w-full rounded-md border ${
                errors.region_id ? 'border-red-500' : 'border-gray-300'
              } shadow-sm focus:border-purple-500 focus:ring-purple-500 h-10 px-3`}
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
            {errors.region_id && (
              <p className="mt-1 text-sm text-red-600">{errors.region_id.message}</p>
            )}
          </div>
        )}

        {/* Voting Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Voting Date*</label>
          <select
            {...register('voting_date_id')}
            className={`mt-1 block w-full rounded-md border ${
              errors.voting_date_id ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-purple-500 focus:ring-purple-500 h-10 px-3`}
          >
            <option value="">Select Voting Date</option>
            {votingDates.map((date) => (
              <option key={date.id} value={date.id}>
                {date.title} ({new Date(date.voting_date).toLocaleDateString()})
              </option>
            ))}
          </select>
          {errors.voting_date_id && (
            <p className="mt-1 text-sm text-red-600">{errors.voting_date_id.message}</p>
          )}
        </div>

        {/* Party Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {selectedFile && (
            <p className="mt-1 text-sm text-gray-600">Selected: {selectedFile.name}</p>
          )}
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Register Party'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreatePartyForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CreatePartyForm;