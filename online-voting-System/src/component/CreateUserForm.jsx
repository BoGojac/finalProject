import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Modal from './ui/FormModal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useRegionStore from '../store/regionStore';
import useConstituencyStore from '../store/constituencyStore';
import usePollingStationStore from '../store/pollingStationStore';
import useVotingDateStore from '../store/votingDateStore';

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['male', 'female']),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(10, 'Phone number required'),
  username: z.string().min(1, 'Username required'),
  password: z.string().min(8, 'Minimum 8 characters'),
  password_confirmation: z.string().min(8, 'Confirm your password'),
  voting_date_id: z.string().nonempty('Voting date is required'),
  role: z.enum(['Admin', 'Board Manager', 'Constituency Staff', 'Polling Station Staff']),
  region_id: z.string().optional(),
  constituency_id: z.string().optional(),
  polling_station_id: z.string().optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
});

const CreateUserForm = ({ isOpen, onClose }) => {
  const { regions, fetchRegions } = useRegionStore();
  const { constituencies, fetchConstituencies } = useConstituencyStore();
  const { pollingStations, fetchPollingStations } = usePollingStationStore();
  const { votingDates, fetchVotingDates } = useVotingDateStore();

  const {
    register, 
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { gender: 'male', role: 'Admin', voting_date_id: '' },
  });

  const watchRole = watch('role');
  const watchRegion = watch('region_id');
  const watchConstituency = watch('constituency_id');

 useEffect(() => {
  fetchRegions();
}, [fetchRegions]);

useEffect(() => {
  if (['Constituency Staff', 'Polling Station Staff'].includes(watchRole)) {
    fetchConstituencies();
  }
}, [watchRole, fetchConstituencies]);

useEffect(() => {
  if (watchRole === 'Polling Station Staff' && watchConstituency) {
    fetchPollingStations(watchConstituency);
  }
}, [watchRole, watchConstituency, fetchPollingStations]);

useEffect(() => {
  fetchVotingDates();
}, [fetchVotingDates]);


  const onSubmit = async (data) => {
    try {
      const resUser = await axios.post('http://127.0.0.1:8000/api/userregister', {
        email: data.email,
        phone_number: data.phoneNumber,
        username: data.username,
        password: data.password,
        password_confirmation: data.password_confirmation,
        role: data.role,
        voting_date_id: data.voting_date_id,
        status: 'active',
      });

      if (resUser.status !== 201) {
        setError('root', { type: 'manual', message: 'Registration failed' });
        return;
      }

      const userId = resUser.data.user.id;
      const payload = {
        user_id: userId,
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        gender: data.gender,
        ...(data.constituency_id && { constituency_id: data.constituency_id }),
        ...(data.polling_station_id && { polling_station_id: data.polling_station_id }),
      };

      switch (data.role) {
        case 'Admin':
          await axios.post('http://127.0.0.1:8000/api/admin', payload);
          break;
        case 'Board Manager':
          await axios.post('http://127.0.0.1:8000/api/boardmanagers', payload);
          break;
        case 'Constituency Staff':
          await axios.post('http://127.0.0.1:8000/api/constituencystaff', payload);
          break;
        case 'Polling Station Staff':
          await axios.post('http://127.0.0.1:8000/api/pollingstationstaff', payload);
          break;
      }

      onClose(); // or callback onSuccess
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: err.response?.data?.message || 'Submission failed',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Create New User" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'First Name', field: 'firstName' },
          { label: 'Middle Name', field: 'middleName', optional: true },
          { label: 'Last Name', field: 'lastName' },
          { label: 'Email', field: 'email', type: 'email' },
          { label: 'Phone Number', field: 'phoneNumber' },
          { label: 'Username', field: 'username' },
          { label: 'Password', field: 'password', type: 'password' },
          { label: 'Confirm Password', field: 'password_confirmation', type: 'password' },
        ].map(({ label, field, type = 'text', optional }) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm font-medium">{label}</label>
            <input
              type={type}
              {...register(field)}
              className={`w-full border rounded h-10 px-2 ${
                errors[field] ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={label}
            />
            {!optional && errors[field] && (
              <p className="text-red-500 text-sm">{errors[field].message}</p>
            )}
          </div>
        ))}

        {/* Voting Date Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Voting Date</label>
          <select
            {...register('voting_date_id')}
            className={`w-full border rounded h-10 px-2 ${
              errors.voting_date_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Voting Date</option>
              {Array.isArray(votingDates) &&
                votingDates.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
              ))}
          </select>
          {errors.voting_date_id && (
            <p className="text-red-500 text-sm">{errors.voting_date_id.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Gender</label>
          <div className="flex gap-4 mt-2">
            {['male', 'female'].map((g) => (
              <label key={g}>
                <input type="radio" value={g} {...register('gender')} className="mr-1" />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Role</label>
          <select {...register('role')} className="w-full border rounded h-10 px-2">
            {['Admin', 'Board Manager', 'Constituency Staff', 'Polling Station Staff'].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Region (conditional) */}
        {(watchRole === 'Constituency Staff' || watchRole === 'Polling Station Staff') && (
          <div className="flex flex-col">
            <label className="text-sm font-medium">Region</label>
            <select
              {...register('region_id')}
              className="w-full border rounded h-10 px-2"
              onChange={(e) => {
                setValue('region_id', e.target.value);
                setValue('constituency_id', '');
                setValue('polling_station_id', '');
              }}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.region_id && <p className="text-red-500 text-sm">{errors.region_id.message}</p>}
          </div>
        )}

        {/* Constituency (conditional) */}
        {watchRegion && (watchRole === 'Constituency Staff' || watchRole === 'Polling Station Staff') && (
            <div className="flex flex-col">
              <label className="text-sm font-medium">Constituency</label>
              <select
                {...register('constituency_id')}
                className="w-full border rounded h-10 px-2"
                onChange={(e) => {
                  setValue('constituency_id', e.target.value);
                  setValue('polling_station_id', '');
                }}
              >
                <option value="">Select Constituency</option>
                {constituencies
                  .filter((c) => String(c.region_id) === String(watchRegion))
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

        {/* Polling Station (conditional) */}
        {watchRole === 'Polling Station Staff' && watchConstituency && (
          <div className="flex flex-col">
            <label className="text-sm font-medium">Polling Station</label>
            <select
              {...register('polling_station_id')}
              className="w-full border rounded h-10 px-2"
            >
              <option value="">Select Polling Station</option>
              {pollingStations
                .filter((p) => String(p.constituency_id) === String(watchConstituency))
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>
        )}

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
            {isSubmitting ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateUserForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default CreateUserForm;
