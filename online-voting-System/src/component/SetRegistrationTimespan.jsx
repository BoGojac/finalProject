//import React from 'react';
import { useState, useEffect } from 'react';
import { CalendarRange, Users, UserPlus, Edit2, Trash2, Check, X, AlertCircle} from 'lucide-react';

const SetRegistrationTimespan = () => {
  // State for registration periods
  const [periods, setPeriods] = useState({
    voter: { startDate: '', endDate: '', isEditing: false, tempStart: '', tempEnd: '' },
    candidate: { startDate: '', endDate: '', isEditing: false, tempStart: '', tempEnd: '' }
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Load saved periods on component mount
  useEffect(() => {
    // Mock API call - replace with actual API call
    const fetchPeriods = async () => {
      try {
        // const response = await fetch('/api/registration-periods');
        // const data = await response.json();
        const mockData = {
          voter: { startDate: '2023-06-01', endDate: '2023-06-30' },
          candidate: { startDate: '2023-05-15', endDate: '2023-05-31' }
        };
        
        setPeriods({
          voter: { ...mockData.voter, isEditing: false, tempStart: mockData.voter.startDate, tempEnd: mockData.voter.endDate },
          candidate: { ...mockData.candidate, isEditing: false, tempStart: mockData.candidate.startDate, tempEnd: mockData.candidate.endDate }
        });
      } catch (err) {
        console.error('Error fetching periods:', err);
      }
    };

    fetchPeriods();
  }, []);

  const handleEdit = (type) => {
    setPeriods(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        isEditing: true,
        tempStart: prev[type].startDate,
        tempEnd: prev[type].endDate
      }
    }));
  };

  const handleCancelEdit = (type) => {
    setPeriods(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        isEditing: false
      }
    }));
  };

  const handleSave = async (type) => {
    const { tempStart, tempEnd } = periods[type];

    if (!tempStart || !tempEnd) {
      setError('Both start and end dates are required');
      return;
    }

    if (new Date(tempEnd) < new Date(tempStart)) {
      setError('End date cannot be before start date');
      return;
    }

    try {
      // Mock API call - replace with actual API call
      // await fetch('/api/registration-periods', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ [type]: { startDate: tempStart, endDate: tempEnd } })
      // });

      setPeriods(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          startDate: tempStart,
          endDate: tempEnd,
          isEditing: false
        }
      }));

      setSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} registration period updated successfully`);
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update period');
      console.error('Error:', err);
    }
  };

  const handleDelete = async (type) => {
    try {
      // Mock API call - replace with actual API call
      // await fetch('/api/registration-periods', {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type })
      // });

      setPeriods(prev => ({
        ...prev,
        [type]: {
          startDate: '',
          endDate: '',
          isEditing: false,
          tempStart: '',
          tempEnd: ''
        }
      }));

      setSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} registration period deleted`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete period');
      console.error('Error:', err);
    }
  };

  const handleChange = (type, field, value) => {
    setPeriods(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-[#F0EBF8]">
      <h2 className="text-2xl font-semibold text-[#4A2C82] mb-6 flex items-center gap-2">
        <CalendarRange className="text-[#6B4AA0]" /> Manage Registration Periods
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-[#FFEBEE] text-[#C62828] rounded-md flex items-start gap-2">
          <AlertCircle className="mt-0.5 flex-shrink-0" size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-2 bg-[#E8F5E9] text-[#2E7D32] rounded-md border border-[#C8E6C9]">
          {success}
        </div>
      )}

      {/* Voter Registration Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#4A2C82] flex items-center gap-2">
            <Users className="text-[#6B4AA0]" /> Voter Registration Period
          </h3>
          {!periods.voter.isEditing && periods.voter.startDate && (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit('voter')}
                className="p-1 text-[#6B4AA0] hover:text-[#5D3A8F] transition-colors"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete('voter')}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        {periods.voter.isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#5E5E5E] mb-1">Start Date</label>
              <input
                type="date"
                value={periods.voter.tempStart}
                onChange={(e) => handleChange('voter', 'tempStart', e.target.value)}
                className="w-full px-3 py-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5E5E5E] mb-1">End Date</label>
              <input
                type="date"
                value={periods.voter.tempEnd}
                onChange={(e) => handleChange('voter', 'tempEnd', e.target.value)}
                className="w-full px-3 py-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                required
                min={periods.voter.tempStart}
              />
            </div>
            <div className="flex gap-2 col-span-2">
              <button
                onClick={() => handleSave('voter')}
                className="px-3 py-1 bg-[#6B4AA0] text-white rounded-md hover:bg-[#5D3A8F] flex items-center gap-1"
              >
                <Check size={16} /> Save
              </button>
              <button
                onClick={() => handleCancelEdit('voter')}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center gap-1"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        ) : periods.voter.startDate ? (
          <div className="bg-[#F9F5FF] p-4 rounded-lg border border-[#F0EBF8] mb-4">
            <p className="text-[#5E5E5E]">
              {new Date(periods.voter.startDate).toLocaleDateString()} to {new Date(periods.voter.endDate).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">No voter registration period set</p>
        )}
      </div>

      {/* Candidate Registration Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#4A2C82] flex items-center gap-2">
            <UserPlus className="text-[#6B4AA0]" /> Candidate Registration Period
          </h3>
          {!periods.candidate.isEditing && periods.candidate.startDate && (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit('candidate')}
                className="p-1 text-[#6B4AA0] hover:text-[#5D3A8F] transition-colors"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete('candidate')}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        {periods.candidate.isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#5E5E5E] mb-1">Start Date</label>
              <input
                type="date"
                value={periods.candidate.tempStart}
                onChange={(e) => handleChange('candidate', 'tempStart', e.target.value)}
                className="w-full px-3 py-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5E5E5E] mb-1">End Date</label>
              <input
                type="date"
                value={periods.candidate.tempEnd}
                onChange={(e) => handleChange('candidate', 'tempEnd', e.target.value)}
                className="w-full px-3 py-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                required
                min={periods.candidate.tempStart}
              />
            </div>
            <div className="flex gap-2 col-span-2">
              <button
                onClick={() => handleSave('candidate')}
                className="px-3 py-1 bg-[#6B4AA0] text-white rounded-md hover:bg-[#5D3A8F] flex items-center gap-1"
              >
                <Check size={16} /> Save
              </button>
              <button
                onClick={() => handleCancelEdit('candidate')}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center gap-1"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        ) : periods.candidate.startDate ? (
          <div className="bg-[#F9F5FF] p-4 rounded-lg border border-[#F0EBF8] mb-4">
            <p className="text-[#5E5E5E]">
              {new Date(periods.candidate.startDate).toLocaleDateString()} to {new Date(periods.candidate.endDate).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">No candidate registration period set</p>
        )}
      </div>

      {/* Create New Period Section */}
      <div className="mt-8 border-t border-[#F0EBF8] pt-6">
        <h3 className="text-lg font-medium text-[#4A2C82] mb-4">Create New Registration Period</h3>
        <div className="flex gap-4">
          <button
            onClick={() => handleEdit('voter')}
            className="px-4 py-2 bg-[#6B4AA0] text-white rounded-md hover:bg-[#5D3A8F] flex items-center gap-2"
          >
            <Users size={16} /> Set Voter Period
          </button>
          <button
            onClick={() => handleEdit('candidate')}
            className="px-4 py-2 bg-[#6B4AA0] text-white rounded-md hover:bg-[#5D3A8F] flex items-center gap-2"
          >
            <UserPlus size={16} /> Set Candidate Period
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetRegistrationTimespan;