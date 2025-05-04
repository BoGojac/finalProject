
import { useState } from 'react';
import Modal from './ui/FormModal';
import PropTypes from 'prop-types';

const CreatePartyForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    leader: '',
    foundingYear: '',
    headquarters: '',
    participationArea: 'national',
    regionName: '', // New field for region name
    logo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData to handle file upload
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      // Only include regionName if participationArea is regional
      if (key === 'regionName' && formData.participationArea !== 'regional') continue;
      formDataToSubmit.append(key, formData[key]);
    }
    
    onSubmit(formDataToSubmit);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal title="Register New Party" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label className="block text-sm font-medium text-gray-700">Party Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Abbreviation</label>
            <input
              type="text"
              name="abbreviation"
              value={formData.abbreviation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Leader</label>
            <input
              type="text"
              name="leader"
              value={formData.leader}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Founding Year</label>
            <input
              type="number"
              name="foundingYear"
              value={formData.foundingYear}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Headquarters</label>
            <input
              type="text"
              name="headquarters"
              value={formData.headquarters}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>        
        <div>
          <label className="block text-sm font-medium text-gray-700">Participation Area</label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="participationArea"
                value="national"
                checked={formData.participationArea === 'national'}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">National</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="participationArea"
                value="regional"
                checked={formData.participationArea === 'regional'}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">Regional</span>
            </label>
          </div>
        </div>

        {/* Conditionally render region name input */}
        {formData.participationArea === 'regional' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Region Name</label>
            <input
              type="text"
              name="regionName"
              value={formData.regionName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required={formData.participationArea === 'regional'}
            />
          </div>
        )}
        
        {/* Rest of the form remains the same */}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Logo</label>
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
            accept="image/*"
          />
        </div>
        
        <div className="justify-self-end pt-4">

          <button
            type="submit"
            className="px-4 py-2 bg-purple-800 rounded-md text-sm font-medium text-white hover:bg-purple-600"
          >
            Register Party
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreatePartyForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CreatePartyForm;