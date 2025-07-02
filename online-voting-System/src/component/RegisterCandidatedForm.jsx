import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Modal from './ui/FormModal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useVotingDateStore from '../store/votingDateStore';
import usePartyStore from '../store/partyStore';
import useAuthStore from '../store/authStore';
import useConstituencyStore from '../store/constituencyStore';

const candidateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['Male', 'Female']),
  birthDate: z.string().min(1, 'Birth date is required'),
  residenceDuration: z.number().min(0, 'Residence duration must be positive'),
  residenceUnit: z.enum(['months', 'years']),
  homeNo: z.string().optional(),
  disability: z.enum(['None', 'Visual', 'Hearing', 'Physical', 'Intellectual', 'Other']),
  disabilityType: z.string().optional(),
  candidate_type: z.enum(['individual', 'party']),
  party_id: z.string().optional(),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string().min(8, 'Confirm your password'),
  voting_date_id: z.string().min(1, 'Voting date is required'),
  constituency_id: z.string().min(1, 'Constituency is required'), // Added validation
  image: z.any().optional()
}).superRefine((data, ctx) => {
  if (data.password !== data.password_confirmation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords don't match",
      path: ['password_confirmation']
    });
  }
  if (data.candidate_type === 'party' && !data.party_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Party is required for party candidates",
      path: ['party_id']
    });
  }
  if (data.disability === 'Other' && !data.disabilityType) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please specify disability type",
      path: ['disabilityType']
    });
  }
});

const CreateCandidateForm = ({ isOpen, onClose }) => {
  const { votingDates, fetchVotingDates } = useVotingDateStore();
  const { parties, fetchParties } = usePartyStore();
  const { constituency_staff } = useAuthStore();
  const { fetchConstituencies } = useConstituencyStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      gender: 'Male',
      disability: 'None',
      candidate_type: 'individual',
      residenceUnit: 'years'
    }
  });

  const watchCandidateType = watch('candidate_type');
  const watchDisability = watch('disability');

  useEffect(() => {
    if (isOpen) {
      fetchVotingDates();
      fetchParties();
      fetchConstituencies();
    }
  }, [isOpen, fetchVotingDates, fetchParties, fetchConstituencies]);

  useEffect(() => {
  if (constituency_staff?.constituency_id) {
    setValue('constituency_id', constituency_staff.constituency_id.toString());
  }
}, [constituency_staff, setValue]);

    const onSubmit = async (data) => {
      console.log("Submitted");
      console.log('Form data before submission:', data);

      try {
        // Step 1: Register the user
        const userRes = await axios.post('http://127.0.0.1:8000/api/userregister', {
          email: data.email,
          phone_number: data.phoneNumber,
          username: data.username,
          password: data.password,
          password_confirmation: data.password_confirmation,
          role: 'Candidate',
          voting_date_id: data.voting_date_id,
          status: 'active'
        }, {
            headers: {
              'Accept': 'application/json',
            }
          });

        if (userRes.status !== 201 && userRes.status !== 200) {
          throw new Error('User registration failed');
        }

        const userId = userRes.data.user.id;

        // Step 2: Prepare candidate FormData
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('first_name', data.firstName);
        formData.append('middle_name', data.middleName || '');
        formData.append('last_name', data.lastName);
        formData.append('gender', data.gender);
        formData.append('birth_date', data.birthDate);
        formData.append('disability', data.disability);
        formData.append('disability_type', data.disabilityType || '');
        formData.append('residence_duration', data.residenceDuration.toString());
        formData.append('residence_unit', data.residenceUnit);
        formData.append('home_number', data.homeNo || '');
        formData.append('candidate_type', data.candidate_type);
        formData.append('voting_date_id', data.voting_date_id); // optional, if needed in candidate too

        // ✅ Add constituency_id from logged-in constituency_staff
        if (constituency_staff?.constituency_id) {
          formData.append('constituency_id', constituency_staff.constituency_id.toString());
        } else {
          throw new Error('Constituency ID not found for the logged-in staff.');
        }

        if (data.candidate_type === 'party') {
          formData.append('party_id', data.party_id);
        }

        if (data.image && data.image.length > 0) {
          formData.append('image', data.image[0]);
        }

        // Step 3: Register candidate
        const candidateRes = await axios.post('http://127.0.0.1:8000/api/candidate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }, { timeout: 10000 });

        if (candidateRes.status !== 201) {
          throw new Error('Candidate registration failed');
        }

        onClose(); // close modal on success

      } catch (err) {
        console.error('Error response data:', err.response?.data);
        setError('root', {
          type: 'manual',
          message: err.response?.data?.message || err.message || 'Registration failed.',
        });
      }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Register New Candidate" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Upload */}
        <div className="col-span-2 flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 overflow-hidden border border-gray-300">
            {watch('image')?.length > 0 ? (
              <img 
                src={URL.createObjectURL(watch('image')[0])} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <label className="cursor-pointer text-sm">
            <span className="text-purple-600 hover:text-purple-800 px-3 py-1 border border-blue-200 rounded-md">
              {watch('image')?.length > 0 ? 'Change Photo' : 'Upload Photo'}
            </span>
            <input
              type="file"
              accept="image/*"
              {...register('image')}
              className="hidden"
            />
          </label>
        </div>

        {/* Name Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            {...register('firstName')}
            className={`w-full border rounded h-10 px-2 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
          <input
            {...register('middleName')}
            className="w-full border border-gray-300 rounded h-10 px-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            {...register('lastName')}
            className={`w-full border rounded h-10 px-2 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div className="flex gap-4 mt-2">
            {['Male', 'Female'].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  value={gender}
                  {...register('gender')}
                  className="mr-2 accent-purple-600 w-5 h-5"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>
          
          {/* to take constituency_id from the staff */}
        <input type="hidden" {...register('constituency_id')} />


        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
          <input
            type="date"
            {...register('birthDate')}
            className={`w-full border rounded h-10 px-2 ${
              errors.birthDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
        </div>

        {/* Residence Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Residence</label>
          <div className="flex">
            <input
              type="number"
              {...register('residenceDuration', { valueAsNumber: true })}
              className={`w-3/4 border rounded-l h-10 px-2 ${
                errors.residenceDuration ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <select
              {...register('residenceUnit')}
              className="w-1/4 border border-l-0 border-gray-300 rounded-r h-10 px-2"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
          {errors.residenceDuration && <p className="text-red-500 text-sm">{errors.residenceDuration.message}</p>}
        </div>

        {/* Home Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Home Number</label>
          <input
            {...register('homeNo')}
            className="w-full border border-gray-300 rounded h-10 px-2"
          />
        </div>

        {/* Disability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Disability Status</label>
          <select
            {...register('disability')}
            className={`w-full border rounded h-10 px-2 ${
              errors.disability ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {['None', 'Visual', 'Hearing', 'Physical', 'Intellectual', 'Other'].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {watchDisability === 'Other' && (
            <div className="mt-2">
              <input
                {...register('disabilityType')}
                className={`w-full border rounded h-10 px-2 ${
                  errors.disabilityType ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Specify disability type"
              />
              {errors.disabilityType && <p className="text-red-500 text-sm">{errors.disabilityType.message}</p>}
            </div>
          )}
        </div>

        {/* Candidate Type and Party */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Type</label>
          <div className="flex gap-4">
            {['individual', 'party'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  value={type}
                  {...register('candidate_type')}
                  className="mr-2"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {watchCandidateType === 'party' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Political Party</label>
            <select
              {...register('party_id')}
              className={`w-full border rounded h-10 px-2 ${
                errors.party_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Party</option>
              {parties.map(party => (
                <option key={party.id} value={party.id}>{party.name}</option>
              ))}
            </select>
            {errors.party_id && <p className="text-red-500 text-sm">{errors.party_id.message}</p>}
          </div>
        )}

        {/* User Account Fields */}
        <div className="col-span-2 border-t border-gray-200 pt-4 mt-2">
          <h3 className="font-medium text-gray-700 mb-2">Account Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full border rounded h-10 px-2 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            {...register('phoneNumber')}
            className={`w-full border rounded h-10 px-2 ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            {...register('username')}
            className={`w-full border rounded h-10 px-2 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full border rounded h-10 px-2 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            {...register('password_confirmation')}
            className={`w-full border rounded h-10 px-2 ${
              errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>
          )}
        </div>

        {/* Voting Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Voting Date</label>
          <select
            {...register('voting_date_id')}
            className={`w-full border rounded h-10 px-2 ${
              errors.voting_date_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Voting Date</option>
            {votingDates.map(date => (
              <option key={date.id} value={date.id}>{date.title}</option>
            ))}
          </select>
          {errors.voting_date_id && <p className="text-red-500 text-sm">{errors.voting_date_id.message}</p>}
        </div>

        {/* Hidden constituency_id field */}
        <input type="hidden" {...register('constituency_id')} />

        {/* Error & Submit */}
        {errors.root && (
          <p className="text-red-600 text-center col-span-2">{errors.root.message}</p>
        )}
        <div className="col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            {isSubmitting ? 'Registering...' : 'Register Candidate'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateCandidateForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateCandidateForm;