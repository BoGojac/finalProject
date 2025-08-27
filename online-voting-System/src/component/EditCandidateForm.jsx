// EditCandidateForm.jsx
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect } from 'react';
import { z } from 'zod';
import Modal from './ui/FormModal';
import usePartyStore from '../store/partyStore';
import useAuthStore from '../store/authStore';

// Zod schema
const editCandidateSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'Last name is required'),
  gender: z.enum(['Male', 'Female'], { errorMap: () => ({ message: 'Gender is required' }) }),
  birth_date: z.string()
  .min(1, 'Birth date is required')
  .refine(val => {
    const birth = new Date(val);
    const today = new Date();
    const ageLimit = new Date(today.getFullYear() - 21, today.getMonth(), today.getDate());
    return birth <= ageLimit;
  }, {
    message: 'Candidate must be at least 21 years old',
  }),
  disability: z.enum(['None', 'Visual', 'Hearing', 'Physical', 'Intellectual', 'Other'], {
    errorMap: () => ({ message: 'Disability is required' }),
  }),
  disability_type: z.string().optional(),
  residence_duration: z.coerce.number().min(1, 'Must be at least 1'),
  residence_unit: z.enum(['months', 'years'], {
    errorMap: () => ({ message: 'Residence unit is required' }),
  }),
  home_number: z.string().optional(),
  candidate_type: z.enum(['individual', 'party']),
  party_id: z.string().optional(),
  image: z.any().optional(),
}).superRefine((data, ctx) => {
  if (data.disability === 'Other' && !data.disability_type?.trim()) {
    ctx.addIssue({
      path: ['disability_type'],
      message: 'Disability type is required when disability is "Other"',
      code: z.ZodIssueCode.custom,
    });
  }
  if (data.candidate_type === 'party' && !data.party_id) {
    ctx.addIssue({
      path: ['party_id'],
      message: 'Party selection is required for party candidates',
      code: z.ZodIssueCode.custom,
    });
  }
});

const EditCandidateForm = ({ isOpen, onClose, onSuccess, candidate }) => {
  const { parties, fetchParties } = usePartyStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editCandidateSchema),
    defaultValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      birth_date: '',
      disability: '',
      disability_type: '',
      residence_duration: '',
      residence_unit: 'years',
      home_number: '',
      candidate_type: 'individual',
      party_id: '',
      image: null,
    },
  });

  const watchDisability = watch('disability');
  const watchImage = watch('image');
  const watchCandidateType = watch('candidate_type');

  useEffect(() => {
    if (isOpen) fetchParties();
  }, [isOpen, fetchParties]);

  useEffect(() => {
    if (candidate) {
      const [durationValue, durationUnit] = candidate.duration_of_residence?.split(' ') || ['', 'years'];
      reset({
        first_name: candidate.first_name || '',
        middle_name: candidate.middle_name || '',
        last_name: candidate.last_name || '',
        gender: candidate.gender || '',
        birth_date: candidate.birth_date || '',
        disability: candidate.disability || '',
        disability_type: candidate.disability_type || '',
        residence_duration: durationValue || '',
        residence_unit: durationUnit || 'years',
        home_number: candidate.home_number || '',
        candidate_type: candidate.candidate_type || 'individual',
        party_id: candidate.party_id?.toString() || '',
        image: null,
      });
    }
  }, [candidate, reset]);

  const onSubmit = async (data) => {
    const { token } = useAuthStore.getState();
    if (!candidate) return;

    const formData = new FormData();
    formData.append('user_id', candidate.user_id);
    formData.append('constituency_id', candidate.constituency_id);
    formData.append('candidate_type', data.candidate_type);

    formData.append('first_name', data.first_name);
    formData.append('middle_name', data.middle_name || '');
    formData.append('last_name', data.last_name);
    formData.append('gender', data.gender);
    formData.append('birth_date', data.birth_date);
    formData.append('disability', data.disability);
    formData.append('disability_type', data.disability === 'Other' ? data.disability_type || '' : '');
    formData.append('residence_duration', data.residence_duration);
    formData.append('residence_unit', data.residence_unit);
    formData.append('home_number', data.home_number || '');
    if (data.candidate_type === 'party') {
      formData.append('party_id', data.party_id);
    }
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/candidate/${candidate.id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` },
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Edit failed:', error.response?.data || error.message);
    }
  };

  if (!isOpen || !candidate) return null;

  const existingImageUrl = candidate.image ? `http://127.0.0.1:8000/storage/${candidate.image}` : null;

  return (
    <Modal title="Edit Candidate" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 flex flex-col items-center mb-2">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 overflow-hidden border border-gray-300">
            {watchImage?.length > 0 ? (
              <img src={URL.createObjectURL(watchImage[0])} alt="Preview" className="w-full h-full object-cover" />
            ) : existingImageUrl ? (
              <img src={existingImageUrl} alt="Current Candidate" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          <label className="cursor-pointer text-sm">
            <span className="text-purple-600 hover:text-purple-800 px-3 py-1 border border-blue-200 rounded-md">
              {watchImage?.length > 0 ? 'Change Photo' : 'Upload Photo'}
            </span>
            <input type="file" accept="image/*" {...register('image')} className="hidden" />
          </label>
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}
        </div>

        <div>
          <label>First Name</label>
          <input type="text" {...register('first_name')} className="w-full border border-gray-300 rounded h-10 px-2" />
          {errors.first_name && <p className="text-red-600 text-sm">{errors.first_name.message}</p>}
        </div>

        <div>
          <label>Middle Name</label>
          <input type="text" {...register('middle_name')} className="w-full border border-gray-300 rounded h-10 px-2" />
        </div>

        <div>
          <label>Last Name</label>
          <input type="text" {...register('last_name')} className="w-full border border-gray-300 rounded h-10 px-2" />
          {errors.last_name && <p className="text-red-600 text-sm">{errors.last_name.message}</p>}
        </div>

        <div>
          <label>Gender</label>
          <div className="flex gap-4 mt-2">
            {['Male', 'Female'].map((gender) => (
              <label key={gender} className="flex items-center">
                <input type="radio" value={gender} {...register('gender')} className="mr-2 accent-purple-600 w-5 h-5" />
                {gender}
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}
        </div>

        <div>
          <label>Birth Date</label>
<input
            type="date"
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 21)).toISOString().split('T')[0]}
            {...register('birth_date')}
            className={`w-full border rounded h-10 px-2 ${
              errors.birth_date ? 'border-red-500' : 'border-gray-300'
            }`}
          />          
          {errors.birth_date && <p className="text-red-600 text-sm">{errors.birth_date.message}</p>}
        </div>

        <div>
          <label>Disability</label>
          <select {...register('disability')} className="w-full border border-gray-300 rounded h-10 px-2">
            <option value="">Select Disability</option>
            {['None', 'Visual', 'Hearing', 'Physical', 'Intellectual', 'Other'].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.disability && <p className="text-red-600 text-sm">{errors.disability.message}</p>}
        </div>

        {watchDisability === 'Other' && (
          <div>
            <label>Specify Disability Type</label>
            <input type="text" {...register('disability_type')} className="w-full border border-gray-300 rounded h-10 px-2" />
            {errors.disability_type && <p className="text-red-600 text-sm">{errors.disability_type.message}</p>}
          </div>
        )}

        <div className="md:col-span-2">
          <label>Duration of Residence</label>
          <div className="flex">
            <input type="number" {...register('residence_duration')} className="w-3/4 border border-gray-300 rounded-l h-10 px-2" />
            <select {...register('residence_unit')} className="w-1/4 border border-l-0 border-gray-300 rounded-r h-10 px-2">
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
          {errors.residence_duration && <p className="text-red-600 text-sm">{errors.residence_duration.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label>Home Number</label>
          <input type="text" {...register('home_number')} className="w-full border border-gray-300 rounded h-10 px-2" />
        </div>

        <div className="md:col-span-2">
          <label>Candidate Type</label>
          <div className="flex gap-4 mt-2">
            {['individual', 'party'].map((type) => (
              <label key={type} className="flex items-center">
                <input type="radio" value={type} {...register('candidate_type')} className="mr-2" />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {watchCandidateType === 'party' && (
          <div className="md:col-span-2">
            <label>Political Party</label>
            <select {...register('party_id')} className="w-full border border-gray-300 rounded h-10 px-2">
              <option value="">Select Party</option>
              {parties.map((party) => (
                <option key={party.id} value={party.id}>{party.name}</option>
              ))}
            </select>
            {errors.party_id && <p className="text-red-600 text-sm">{errors.party_id.message}</p>}
          </div>
        )}

        <div className="col-span-2 flex justify-end gap-3 mt-6">
          <button type="submit" className="rounded bg-purple-600 px-5 py-2 font-semibold text-white hover:bg-purple-700 transition">
            Update Candidate
          </button>
        </div>
      </form>
    </Modal>
  );
};

EditCandidateForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  candidate: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    constituency_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    first_name: PropTypes.string.isRequired,
    middle_name: PropTypes.string,
    last_name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birth_date: PropTypes.string.isRequired,
    disability: PropTypes.string.isRequired,
    disability_type: PropTypes.string,
    home_number: PropTypes.string,
    candidate_type: PropTypes.string.isRequired,
    party_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    duration_of_residence: PropTypes.string,
  }).isRequired,
};

export default EditCandidateForm;