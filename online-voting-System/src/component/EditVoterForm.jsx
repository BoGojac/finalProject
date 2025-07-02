// Edit Voter Form
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect } from 'react';
import { z } from 'zod';
import Modal from './ui/FormModal';

// Zod schema
const editVoterSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, 'Last name is required'),
  gender: z.enum(['Male', 'Female'], { errorMap: () => ({ message: 'Gender is required' }) }),
  birth_date: z.string().min(1, 'Birth date is required'),
  disability: z.enum(['None', 'Visual', 'Hearing', 'Physical', 'Intellectual', 'Other'], {
    errorMap: () => ({ message: 'Disability is required' }),
  }),
  disability_type: z.string().optional(),
  residence_duration: z.coerce.number().min(1, 'Must be at least 1'),
  residence_unit: z.enum(['months', 'years'], {
    errorMap: () => ({ message: 'Residence unit is required' }),
  }),
  home_number: z.string().optional(),

}).superRefine((data, ctx) => {
  if (data.disability === 'Other' && !data.disability_type?.trim()) {
    ctx.addIssue({
      path: ['disability_type'],
      message: 'Disability type is required when disability is "Other"',
      code: z.ZodIssueCode.custom,
    });
  }
  
});

const EditVoterForm = ({ isOpen, onClose, onSuccess, voter }) => {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editVoterSchema),
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


 

  useEffect(() => {
    if (voter) {
      const [durationValue, durationUnit] = voter.duration_of_residence?.split(' ') || ['', 'years'];
      reset({
        first_name: voter.first_name || '',
        middle_name: voter.middle_name || '',
        last_name: voter.last_name || '',
        gender: voter.gender || '',
        birth_date: voter.birth_date || '',
        disability: voter.disability || '',
        disability_type: voter.disability_type || '',
        residence_duration: durationValue || '',
        residence_unit: durationUnit || 'years',
        home_number: voter.home_number || '',
      });
    }
  }, [voter, reset]);


//     if (!voter) return;

//     const formData = new FormData();
//     formData.append('user_id', voter.user_id);
//     formData.append('polling_station_id', voter.polling_station_id);
//     formData.append('first_name', data.first_name);
//     formData.append('middle_name', data.middle_name || '');
//     formData.append('last_name', data.last_name);
//     formData.append('gender', data.gender);
//     formData.append('birth_date', data.birth_date);
//     formData.append('disability', data.disability);
//     formData.append('disability_type', data.disability === 'Other' ? data.disability_type || '' : '');
//     formData.append('residence_duration', data.residence_duration);
//     formData.append('residence_unit', data.residence_unit);
//     formData.append('home_number', data.home_number || '');

//     try {
//       await axios.put(`http://127.0.0.1:8000/api/voter/${voter.id}`, formData, {
//         headers: { 
//             'Content-Type': 'multipart/form-data',
//             // 'Accept': 'application-json',
//          },
//       });
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error('Edit failed:', error.response?.data || error.message);
//     }
//   };

    const onSubmit = async (data) => {
    if (!voter) return;

    const payload = {
        user_id: voter.user_id,
        polling_station_id: voter.polling_station_id,
        first_name: data.first_name,
        middle_name: data.middle_name || '',
        last_name: data.last_name,
        gender: data.gender,
        birth_date: data.birth_date,
        disability: data.disability,
        disability_type: data.disability === 'Other' ? data.disability_type || '' : '',
        residence_duration: data.residence_duration,
        residence_unit: data.residence_unit,
        home_number: data.home_number || '',
    };
    console.log(payload)

    try {
        await axios.put(`http://127.0.0.1:8000/api/voter/${voter.id}`, payload);
        onSuccess();
        onClose();
    } catch (error) {
        console.error('Edit failed:', error.response?.data || error.message);
    }
    };


  if (!isOpen || !voter) return null;


  return (
    <Modal title="Edit Voter" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <input type="date" {...register('birth_date')} className="w-full border border-gray-300 rounded h-10 px-2" />
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


        <div className="col-span-2 flex justify-end gap-3 mt-6">
          <button type="submit" className="rounded bg-purple-600 px-5 py-2 font-semibold text-white hover:bg-purple-700 transition">
            Update Voter
          </button>
        </div>
      </form>
    </Modal>
  );
};

EditVoterForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  voter: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    polling_station_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    first_name: PropTypes.string.isRequired,
    middle_name: PropTypes.string,
    last_name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birth_date: PropTypes.string.isRequired,
    disability: PropTypes.string.isRequired,
    disability_type: PropTypes.string,
    home_number: PropTypes.string,
    duration_of_residence: PropTypes.string,
  }).isRequired,
};

export default EditVoterForm;