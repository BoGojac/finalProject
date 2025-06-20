// // EditPartyForm.jsx
// import { useEffect, useState } from 'react';
// import Modal from './ui/FormModal';
// // import PropTypes from 'prop-types';
// import axios from 'axios';
// import usePartyStore  from '../store/usePartyStore';

// const EditPartyForm = () => {
//   const { isEditOpen, closeEditForm, selectedParty, updateParty } = usePartyStore();
//   const [formData, setFormData] = useState({
//     name: '',
//     abbreviation: '',
//     leader: '',
//     foundingYear: '',
//     headquarters: '',
//     participation_area: 'national',
//     region_id: '',
//     logo: null,
//   });
//   const [regions, setRegions] = useState([]);

//   useEffect(() => {
//     if (selectedParty) {
//       setFormData({
//         ...selectedParty,
//         region_id: selectedParty.region_id || '',
//       });
//     }
//   }, [selectedParty]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/regions')
//       .then(res => setRegions(res.data.data))
//       .catch(err => console.error('Failed to load regions:', err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({ ...prev, logo: e.target.files[0] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (formData.participation_area !== 'regional' && key === 'region_id') return;
//       if (value) payload.append(key, value);
//     });
//     updateParty(selectedParty.id, payload);
//     closeEditForm();
//   };

//   if (!isEditOpen || !selectedParty) return null;

//   return (
//     <Modal title="Edit Party" onClose={closeEditForm}>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block">Party Name</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input w-full" />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block">Abbreviation</label>
//             <input type="text" name="abbreviation" value={formData.abbreviation} onChange={handleChange} required className="form-input w-full" />
//           </div>
//           <div>
//             <label className="block">Leader</label>
//             <input type="text" name="leader" value={formData.leader} onChange={handleChange} required className="form-input w-full" />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block">Founding Year</label>
//             <input type="number" name="foundingYear" value={formData.foundingYear} onChange={handleChange} required className="form-input w-full" />
//           </div>
//           <div>
//             <label className="block">Headquarters</label>
//             <input type="text" name="headquarters" value={formData.headquarters} onChange={handleChange} required className="form-input w-full" />
//           </div>
//         </div>

//         <div>
//           <label className="block">Participation Area</label>
//           <div className="space-x-4">
//             <label className="inline-flex items-center">
//               <input type="radio" name="participation_area" value="national" checked={formData.participation_area === 'national'} onChange={handleChange} className="form-radio" />
//               <span className="ml-2">National</span>
//             </label>
//             <label className="inline-flex items-center">
//               <input type="radio" name="participation_area" value="regional" checked={formData.participation_area === 'regional'} onChange={handleChange} className="form-radio" />
//               <span className="ml-2">Regional</span>
//             </label>
//           </div>
//         </div>

//         {formData.participation_area === 'regional' && (
//           <div>
//             <label className="block">Region</label>
//             <select name="region_id" value={formData.region_id} onChange={handleChange} required className="form-select w-full">
//               <option value="">Select Region</option>
//               {regions.map(region => (
//                 <option key={region.id} value={region.id}>{region.name}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div>
//           <label className="block">Party Logo</label>
//           <input type="file" name="logo" onChange={handleFileChange} className="form-input w-full" accept="image/*" />
//         </div>

//         <div className="pt-4">
//           <button type="submit" className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700">Update Party</button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// EditPartyForm.propTypes = {
//   // unused in Zustand version
// };

// export default EditPartyForm;
