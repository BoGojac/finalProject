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

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['male', 'female']),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(10, 'Phone number required'),
  username: z.string().min(1, 'Username required'),
  role: z.enum(['Admin', 'Board Manager', 'Constituency Staff', 'Polling Station Staff']),
  region_id: z.string().optional(),
  constituency_id: z.string().optional(),
  polling_station_id: z.string().optional(),
});

const EditUserForm = ({ isOpen, onClose, user, onSuccess }) => {
  const { regions, fetchRegions } = useRegionStore();
  const { constituencies, fetchConstituencies } = useConstituencyStore();
  const { pollingStations, fetchPollingStations } = usePollingStationStore();

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
      ...user,
      firstName: user?.first_name || '',
      middleName: user?.middle_name || '',
      lastName: user?.last_name || '',
      phoneNumber: user?.phone_number || '',
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
        ...user,
        firstName: user.first_name,
        middleName: user.middle_name,
        lastName: user.last_name,
        phoneNumber: user.phone_number,
        region_id: user.region?.id || '',
        constituency_id: user.constituency?.id || '',
        polling_station_id: user.polling_station?.id || '',
      });
    }
  }, [fetchRegions, user, reset]);

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
    if (['Constituency Staff', 'Polling Station Staff'].includes(data.role)) {
      if (!data.region_id) {
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
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${user.id}`, {
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        gender: data.gender,
        email: data.email,
        phone_number: data.phoneNumber,
        username: data.username,
        role: data.role,
        region_id: data.region_id || null,
        constituency_id: data.constituency_id || null,
        polling_station_id: data.polling_station_id || null,
      });

      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      setError('root', { 
        type: 'manual', 
        message: error.response?.data?.message || 'Failed to update user' 
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
        }, ].map(({ label, field, type = 'text', optional }) => (
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
              <label key={gender} className="flex items-center gap-1">
                <input 
                  type="radio" 
                  value={gender} 
                  {...register('gender')} 
                  className="text-purple-600 focus:ring-purple-500" 
                />
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label className="text-sm font-medium">Role</label>
          <select 
            {...register('role')} 
            className={`w-full border rounded h-10 px-2 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
            onChange={(e) => {
              setValue('role', e.target.value);
              setValue('region_id', '');
              setValue('constituency_id', '');
              setValue('polling_station_id', '');
            }}
          >
            {['admin', 'boardmanager', 'constituency', 'pollingstation'].map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        {/* Region */}
        {(watchRole === 'Constituency Staff' || watchRole === 'Polling Station Staff') && (
          <div className="flex flex-col">
            <label className="text-sm font-medium">Region</label>
            <select 
              {...register('region_id')} 
              className={`w-full border rounded h-10 px-2 ${errors.region_id ? 'border-red-500' : 'border-gray-300'}`}
              onChange={(e) => {
                setValue('region_id', e.target.value);
                setValue('constituency_id', '');
                setValue('polling_station_id', '');
              }}
            >
              <option value="">Select Region</option>
              {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            {errors.region_id && <p className="text-red-500 text-sm">{errors.region_id.message}</p>}
          </div>
        )}

        {/* Constituency */}
        {(watchRegion && (watchRole === 'Constituency Staff' || watchRole === 'Polling Station Staff')) && (
          <div className="flex flex-col">
            <label className="text-sm font-medium">Constituency</label>
            <select 
              {...register('constituency_id')} 
              className={`w-full border rounded h-10 px-2 ${errors.constituency_id ? 'border-red-500' : 'border-gray-300'}`}
              onChange={(e) => {
                setValue('constituency_id', e.target.value);
                setValue('polling_station_id', '');
              }}
            >
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
            <select 
              {...register('polling_station_id')} 
              className={`w-full border rounded h-10 px-2 ${errors.polling_station_id ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Polling Station</option>
              {pollingStations.filter(p => p.constituency_id == watchConstituency).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.polling_station_id && <p className="text-red-500 text-sm">{errors.polling_station_id.message}</p>}
          </div>
        )}

        {/* Submit */}
        {errors.root && <p className="text-red-600 text-center col-span-2">{errors.root.message}</p>}
        <div className="col-span-2 flex justify-end mt-6">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="bg-purple-800 text-white px-6 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
          >
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