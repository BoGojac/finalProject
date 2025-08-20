import useAuthStore from '../store/authStore';
import useProfileStore from '../store/profileStore';
import { RefreshCcw, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const UserProfile = () => {
  const navigate = useNavigate();
  const {
    user,
    admin,
    board_manager,
    constituency_staff,
    polling_station_staff,
    candidate,
    voter,
    token,
  } = useAuthStore();

  const {
  showPasswordForm,
  togglePasswordForm,
  passwordVisibility,
  togglePasswordVisibility,
  passwordMessage,
  passwordMessageType,
  setPasswordMessage,
  clearPasswordMessage,
} = useProfileStore();



  const getRoleSpecificInfo = () => {
    if (voter || polling_station_staff) {
      return {
        label: 'Polling Station',
        value:
          voter?.polling_station?.name ||
          polling_station_staff?.polling_station?.name ||
          'N/A',
      };
    }
    if (candidate || constituency_staff) {
      return {
        label: 'Constituency',
        value:
          candidate?.constituency?.name ||
          constituency_staff?.constituency?.name ||
          'N/A',
      };
    }
    return null;
  };

  const roleSpecificInfo = getRoleSpecificInfo();
const fullName =
  voter?.first_name ||
  candidate?.first_name ||
  polling_station_staff?.first_name ||
  constituency_staff?.first_name ||
  admin?.first_name ||
  board_manager?.first_name
    ? `${voter?.first_name 
        || candidate?.first_name 
        || polling_station_staff?.first_name 
        || constituency_staff?.first_name 
        || admin?.first_name 
        || board_manager?.first_name} 
        ${voter?.middle_name 
            || candidate?.middle_name 
            || polling_station_staff?.middle_name 
            || constituency_staff?.middle_name 
            || admin?.middle_name 
            || board_manager?.middle_name || ''} 
            ${voter?.last_name 
                || candidate?.last_name 
                || polling_station_staff?.last_name 
                || constituency_staff?.last_name 
                || admin?.last_name || board_manager?.last_name || ''}`
    : 'N/A';

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
  try {
    await axios.put(`http://127.0.0.1:8000/api/user/password/${user.id}`, {
      current_password: data.current_password,
      new_password: data.new_password,
      new_password_confirmation: data.confirm_password,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    setPasswordMessage('Password updated successfully.', 'success');
    reset();

    // Optional: auto-clear the message after 5 seconds
    setTimeout(() => {
      clearPasswordMessage();
    }, 5000);
  } catch (error) {
    const msg = error.response?.data?.message || 'Password update failed.';
    setPasswordMessage(msg, 'error');

    // Optional: auto-clear the message after 5 seconds
    setTimeout(() => {
      clearPasswordMessage();
    }, 5000);
  }
};



  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-purple-800 hover:bg-purple-600 rounded-md text-white transition"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Personal Information
          </h2>
          <div className="space-y-3">
            <ProfileField label="Full Name" value={fullName} />
            <ProfileField
                label="Gender"
                value={
                    voter?.gender ||
                    candidate?.gender ||
                    polling_station_staff?.gender ||
                    constituency_staff?.gender ||
                    admin?.gender ||
                    board_manager?.gender ||
                    'N/A'
                }
            />
            <ProfileField label="Email" value={user?.email || 'N/A'} />
            <ProfileField label="User Name" value={user?.username || 'N/A'} />
            <ProfileField
                label="Voting Date"
                value={
                    voter?.user?.voting_date?.title ||
                    candidate?.user?.voting_date?.title ||
                    polling_station_staff?.voting_date?.title ||
                    constituency_staff?.voting_date?.title ||
                    admin?.voting_date?.title ||
                    board_manager?.voting_date?.title || 'N/A'
                }
            />
            <ProfileField label="Role" value={user?.role || 'N/A'} />
            <ProfileField label="Phone Number" value={user?.phone_number || 'N/A'} />
          </div>
        </div>

        {/* Additional Info (Voter / Candidate only) */}
        {(voter || candidate) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Additional Information
            </h2>
            <div className="space-y-3">
              <ProfileField label="Birth Date" value={
                voter?.birth_date ||
                    candidate?.birth_date 
                    || 'N/A'} />
              <ProfileField label="Disability" value={
                voter?.disability ||
                    candidate?.disability || 'No'} />
              {user?.disability === 'Yes' && (
                <ProfileField label="Disability Type" value={
                    voter?.disability_type ||
                    candidate?.disability_type || 'N/A'} />
              )}
              <ProfileField label="Duration of Residence" value={
                voter?.duration_of_residence ||
                    candidate?.duration_of_residence  || 'N/A'} />
              <ProfileField label="Home Number" value={voter?.home_number ||
                    candidate?.home_number  || 'N/A'} />
              {roleSpecificInfo && (
                <ProfileField label={roleSpecificInfo.label} value={roleSpecificInfo.value} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Change Password Section - Visible for All */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Change Password</h2>
          <button
            onClick={togglePasswordForm}
            className="flex items-center text-sm font-medium text-purple-700 hover:text-purple-900 transition"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {showPasswordForm && (
          <form
           onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
           <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              {...register('current_password')}
              type={passwordVisibility.current ? 'text' : 'password'}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-purple-300 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute top-8 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              {passwordVisibility.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              {...register('new_password')}
              type={passwordVisibility.new ? 'text' : 'password'}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-purple-300 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute top-8 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              {passwordVisibility.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
            
             <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              {...register('confirm_password')}
              type={passwordVisibility.confirm ? 'text' : 'password'}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-purple-300 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute top-8 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              {passwordVisibility.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
            {passwordMessage && (
              <div
                className={`text-sm font-medium p-3 rounded-md mb-4 ${
                  passwordMessageType === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {passwordMessage}
              </div>
            )}

            <button
              type="submit"
              className="bg-purple-700 text-white font-semibold mt-5 px-5 py-2 rounded-md hover:bg-purple-600 transition"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="border-b border-gray-100 pb-2 last:border-0">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-gray-800">{value}</dd>
  </div>
);

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default UserProfile;
