import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Modal from './ui/FormModal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useRegionStore from '../store/regionStore';
import useUIStore from '../store/uiStore';
import useConstituencyStore from '../store/constituencyStore';
import usePollingStationStore from '../store/pollingStationStore';

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['male', 'female']),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  username: z.string().min(1, 'Username is required'),
  role: z.enum(['Admin', 'Board Manager', 'Constituency Staff', 'Polling Station Staff']),
  region_id: z.string().optional(),
  constituency_id: z.string().optional(),
  polling_station_id: z.string().optional(),
});

const EditUserForm = ({ isOpen, onClose, user, onSuccess }) => {
  const { regions, fetchRegions } = useRegionStore();
  const { constituencies, fetchConstituencies } = useConstituencyStore();
  const { pollingStations, fetchPollingStations } = usePollingStationStore();
  const setSuccessMessage = useUIStore((state) => state.setSuccessMessage);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.first_name || '',
      middleName: user?.middle_name || '',
      lastName: user?.last_name || '',
      gender: user?.gender || 'male',
      email: user?.email || '',
      phoneNumber: user?.phone_number || '',
      username: user?.username || '',
      role: user?.role || 'Admin',
      region_id: user?.region?.id || '',
      constituency_id: user?.constituency?.id || '',
      polling_station_id: user?.polling_station?.id || '',
    },
  });

  const watchRole = watch('role');
  const watchRegion = watch('region_id');
  const watchConstituency = watch('constituency_id');

  useEffect(() => {
    fetchRegions();
    if (user) {
      reset({
        firstName: user.first_name,
        middleName: user.middle_name,
        lastName: user.last_name,
        gender: user.gender,
        email: user.email,
        phoneNumber: user.phone_number,
        username: user.username,
        role: user.role,
        region_id: user.region?.id || '',
        constituency_id: user.constituency?.id || '',
        polling_station_id: user.polling_station?.id || '',
      });
    }
  }, [user, fetchRegions, reset]);

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

  const onSubmit = async (data) => {
      if (['Constituency Staff', 'Polling Station Staff'].includes(data.role) && !data.region_id) {
        setError('region_id', { type: 'manual', message: 'Region is required for this role' });
        return;
      }
      if (data.role === 'Polling Station Staff' && !data.constituency_id) {
        setError('constituency_id', { type: 'manual', message: 'Constituency is required' });
        return;
      }
      if (data.role === 'Polling Station Staff' && !data.polling_station_id) {
        setError('polling_station_id', { type: 'manual', message: 'Polling station is required' });
        return;
      }

      try {
        await axios.put(`http://127.0.0.1:8000/api/user/${user.id}`, {
          email: data.email,
          phone_number: data.phoneNumber,
          username: data.username,
        });

        // Role-specific
        let endpoint = '';
        const profileData = {
          first_name: data.firstName,
          middle_name: data.middleName,
          last_name: data.lastName,
          gender: data.gender,
        };

        switch (data.role) {
          case 'Admin':
            endpoint = `http://127.0.0.1:8000/api/admin/${user.id}`;
            break;
          case 'Board Manager':
            endpoint = `http://127.0.0.1:8000/api/boardmanagers/${user.id}`;
            break;
          case 'Constituency Staff':
            endpoint = `http://127.0.0.1:8000/api/constituencystaff/${user.id}`;
            profileData.constituency_id = data.constituency_id;
            break;
          case 'Polling Station Staff':
            endpoint = `http://127.0.0.1:8000/api/pollingstationstaff/${user.id}`;
            profileData.polling_station_id = data.polling_station_id;
            break;
        }

        const response = await axios.put(endpoint, profileData);

        // ✅ Use the message here
        if (response?.data?.message) {
          setSuccessMessage(response.data.message);
        }

        if (onSuccess) onSuccess();
        onClose();
      } catch (err) {
        setError('root', {
          type: 'manual',
          message: err.response?.data?.message || 'Failed to update user',
        });
      }
    };

  if (!isOpen) return null;

  return (
    <Modal title="Edit User" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{
          label: 'First Name', field: 'firstName'
        }, {
          label: 'Middle Name', field: 'middleName', optional: true
        }, {
          label: 'Last Name', field: 'lastName'
        }, {
          label: 'Email', field: 'email'
        }, {
          label: 'Phone Number', field: 'phoneNumber'
        }, {
          label: 'Username', field: 'username'
        }].map(({ label, field, type = 'text', optional }) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm font-medium">{label}</label>
            <input
              type={type}
              {...register(field)}
              className={`w-full border rounded h-10 px-2 ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={label}
            />
            {!optional && errors[field] && <p className="text-red-500 text-sm">{errors[field].message}</p>}
          </div>
        ))}

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Gender</label>
          <div className="flex gap-4 mt-2">
            {['male', 'female'].map(gender => (
              <label key={gender}><input type="radio" value={gender} {...register('gender')} className="mr-1 accent-purple-600 w-5 h-5" /> {gender}</label>
            ))}
          </div>
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Role</label>
          <select {...register('role')} className={`w-full border rounded h-10 px-2`}>
            {['Admin', 'Board Manager', 'Constituency Staff', 'Polling Station Staff'].map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Region */}
        {(watchRole === 'Constituency Staff' || watchRole === 'Polling Station Staff') && (
          <div className="flex flex-col">
            <label className="text-sm font-medium">Region</label>
            <select {...register('region_id')} className="w-full border rounded h-10 px-2" onChange={(e) => {
              setValue('region_id', e.target.value);
              setValue('constituency_id', '');
              setValue('polling_station_id', '');
            }}>
              <option value="">Select Region</option>
              {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            {errors.region_id && <p className="text-red-500 text-sm">{errors.region_id.message}</p>}
          </div>
        )}

        {/* Constituency */}
        {(watchRegion && ['Constituency Staff', 'Polling Station Staff'].includes(watchRole)) && (
          <div className="flex flex-col">
            <label className="text-sm font-medium">Constituency</label>
            <select {...register('constituency_id')} className="w-full border rounded h-10 px-2" onChange={(e) => {
              setValue('constituency_id', e.target.value);
              setValue('polling_station_id', '');
            }}>
              <option value="">Select Constituency</option>
              {constituencies.filter(c => c.region_id == watchRegion).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.constituency_id && <p className="text-red-500 text-sm">{errors.constituency_id.message}</p>}
          </div>
        )}

        {/* Polling Station */}
        {watchRole === 'Polling Station Staff' && watchConstituency && (
          <div className="flex flex-col">
            <label className="text-sm font-medium">Polling Station</label>
            <select {...register('polling_station_id')} className="w-full border rounded h-10 px-2">
              <option value="">Select Polling Station</option>
              {pollingStations.filter(p => p.constituency_id == watchConstituency).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.polling_station_id && <p className="text-red-500 text-sm">{errors.polling_station_id.message}</p>}
          </div>
        )}

        {/* Submit Button */}
        {errors.root && <p className="text-red-600 col-span-2 text-center">{errors.root.message}</p>}
        <div className="col-span-2 flex justify-end mt-6">
          <button type="submit" disabled={isSubmitting} className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800">
            {isSubmitting ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

EditUserForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

export default EditUserForm;
