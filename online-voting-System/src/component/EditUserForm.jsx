// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios from 'axios';
// import useRegionStore from '../store/regionStore';
// import useConstituencyStore from '../store/constituencyStore';
// import usePollingStationStore from '../store/pollingStationStore';

// const userSchema = z.object({
//   firstName: z.string().min(1, 'First name is required'),
//   middleName: z.string().optional(),
//   lastName: z.string().min(1, 'Last name is required'),
//   gender: z.enum(['male', 'female']),
//   email: z.string().email('Invalid email address'),
//   phoneNumber: z.string().min(1, 'Phone number is required'),
//   username: z.string().min(1, 'Username is required'),
//   role: z.enum(['admin', 'boardmanager', 'constituency', 'pollingstation']),
//   region_id: z.string().optional(),
//   constituency_id: z.string().optional(),
//   polling_station_id: z.string().optional(),
// });

// const EditUserForm = ({ user, onClose }) => {
//   const { regions, fetchRegions } = useRegionStore();
//   const { constituencies, fetchConstituencies } = useConstituencyStore();
//   const { pollingStations, fetchPollingStations } = usePollingStationStore();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(userSchema),
//     defaultValues: {
//       ...user,
//       region_id: user.region?.id || '',
//       constituency_id: user.constituency?.id || '',
//       polling_station_id: user.polling_station?.id || '',
//       // Make sure role is lowercase to match schema enum values
//       role: user.role?.toLowerCase() || '',
//     },
//   });

//   const watchRole = watch('role');
//   const watchRegion = watch('region_id');
//   const watchConstituency = watch('constituency_id');

//   useEffect(() => {
//     fetchRegions();
//   }, [fetchRegions]);

//   useEffect(() => {
//     if (watchRole === 'constituency' || watchRole === 'pollingstation') {
//       fetchConstituencies();
//     }
//   }, [watchRole, fetchConstituencies]);

//   useEffect(() => {
//     if (watchRole === 'pollingstation' && watchConstituency) {
//       fetchPollingStations(watchConstituency);
//     }
//   }, [watchRole, watchConstituency, fetchPollingStations]);

//   useEffect(() => {
//     if (user) {
//       reset({
//         ...user,
//         region_id: user.region?.id || '',
//         constituency_id: user.constituency?.id || '',
//         polling_station_id: user.polling_station?.id || '',
//         role: user.role?.toLowerCase() || '',
//       });
//     }
//   }, [user, reset]);

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       // Adjust API URL as needed
//       const url = `http://127.0.0.1:8000/api/party/${user.id}`;

//       // Optional: Prepare payload; remove empty strings for optional fields
//       const payload = {
//         ...data,
//         region_id: data.region_id || null,
//         constituency_id: data.constituency_id || null,
//         polling_station_id: data.polling_station_id || null,
//       };

//       await axios.patch(url, payload);

//       setIsSubmitting(false);
//       onClose(); // Close form on success
//     } catch (error) {
//       setIsSubmitting(false);
//       if (error.response?.data?.message) {
//         setSubmitError(error.response.data.message);
//       } else {
//         setSubmitError('An error occurred while updating the user.');
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
//       <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" onClick={onClose}></div>

//       <div
//         className="relative z-50 w-full max-w-md md:max-w-xl lg:max-w-3xl bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl border border-white/30 overflow-y-auto"
//         style={{ maxHeight: '90vh' }}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold text-gray-800">Edit User</h3>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//               aria-label="Close"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Personal Information */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
//               <input
//                 type="text"
//                 {...register('firstName')}
//                 className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                   errors.firstName ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
//               <input
//                 type="text"
//                 {...register('middleName')}
//                 className="w-full p-2 border border-gray-300 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
//               <input
//                 type="text"
//                 {...register('lastName')}
//                 className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                   errors.lastName ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
//               <div className="flex gap-4 mt-1">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     value="male"
//                     {...register('gender')}
//                     className="text-[#6B4AA0] focus:ring-[#6B4AA0]"
//                   />
//                   <span>Male</span>
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     value="female"
//                     {...register('gender')}
//                     className="text-[#6B4AA0] focus:ring-[#6B4AA0]"
//                   />
//                   <span>Female</span>
//                 </label>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
//               <input
//                 type="email"
//                 {...register('email')}
//                 className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
//               <input
//                 type="tel"
//                 {...register('phoneNumber')}
//                 className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                   errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>}
//             </div>

//             {/* Account Information */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
//               <input
//                 type="text"
//                 {...register('username')}
//                 className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                   errors.username ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
//             </div>

//             {/* Role Selection */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
//               <select
//                 {...register('role')}
//                 className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                   errors.role ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 onChange={(e) => {
//                   setValue('role', e.target.value);
//                   // Clear dependent selects when role changes
//                   setValue('region_id', '');
//                   setValue('constituency_id', '');
//                   setValue('polling_station_id', '');
//                 }}
//               >
//                 <option value="">Select Role</option>
//                 <option value="admin">Admin</option>
//                 <option value="boardmanager">Board Manager</option>
//                 <option value="constituency">Constituency Staff</option>
//                 <option value="pollingstation">Polling Station Staff</option>
//               </select>
//             </div>

//             {/* Conditional Fields */}
//             {(watchRole === 'constituency' || watchRole === 'pollingstation') && (
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Region*</label>
//                 <select
//                   {...register('region_id', {
//                     required: watchRole === 'constituency' || watchRole === 'pollingstation',
//                   })}
//                   className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                     errors.region_id ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   onChange={(e) => {
//                     setValue('region_id', e.target.value);
//                     setValue('constituency_id', '');
//                     setValue('polling_station_id', '');
//                   }}
//                 >
//                   <option value="">Select Region</option>
//                   {regions.map((region) => (
//                     <option key={region.id} value={region.id}>
//                       {region.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.region_id && <p className="text-xs text-red-500 mt-1">{errors.region_id.message}</p>}
//               </div>
//             )}

//             {(watchRole === 'constituency' || watchRole === 'pollingstation') && watchRegion && (
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Constituency*</label>
//                 <select
//                   {...register('constituency_id', {
//                     required: watchRole === 'constituency' || watchRole === 'pollingstation',
//                   })}
//                   className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                     errors.constituency_id ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   onChange={(e) => {
//                     setValue('constituency_id', e.target.value);
//                     if (watchRole === 'pollingstation') {
//                       setValue('polling_station_id', '');
//                     }
//                   }}
//                 >
//                   <option value="">Select Constituency</option>
//                   {constituencies
//                     .filter((c) => c.region_id === watchRegion)
//                     .map((constituency) => (
//                       <option key={constituency.id} value={constituency.id}>
//                         {constituency.name}
//                       </option>
//                     ))}
//                 </select>
//                 {errors.constituency_id && (
//                   <p className="text-xs text-red-500 mt-1">{errors.constituency_id.message}</p>
//                 )}
//               </div>
//             )}

//             {watchRole === 'pollingstation' && watchConstituency && (
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Polling Station*</label>
//                 <select
//                   {...register('polling_station_id', {
//                     required: watchRole === 'pollingstation',
//                   })}
//                   className={`w-full p-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-[#6B4AA0]/50 focus:border-[#6B4AA0] outline-none transition-all ${
//                     errors.polling_station_id ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   <option value="">Select Polling Station</option>
//                   {pollingStations
//                     .filter((ps) => ps.constituency_id === watchConstituency)
//                     .map((station) => (
//                       <option key={station.id} value={station.id}>
//                         {station.name}
//                       </option>
//                     ))}
//                 </select>
//                 {errors.polling_station_id && (
//                   <p className="text-xs text-red-500 mt-1">{errors.polling_station_id.message}</p>
//                 )}
//               </div>
//             )}

//             {/* Submission error */}
//             {submitError && (
//               <div className="md:col-span-2 text-center text-red-600 font-semibold mt-2">
//                 {submitError}
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="md:col-span-2 flex justify-end mt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="px-6 py-2 rounded-lg bg-[#6B4AA0]/90 text-white hover:bg-[#5a3b91] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:ring-opacity-50 disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Updating...' : 'Update User'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// EditUserForm.propTypes = {
//   user: PropTypes.object.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default EditUserForm;
