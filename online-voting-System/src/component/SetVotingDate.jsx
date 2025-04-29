//import React from 'react';
import { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

const SetVotingDate = () => {
  const [votingDate, setVotingDate] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!votingDate) {
      setError('Please select a voting date');
      return;
    }
    
    const selectedDate = new Date(votingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Voting date cannot be in the past');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Voting date set to:', votingDate);
    setSuccess(true);
    setError('');
    setTimeout(() => setSuccess(false), 3000);
  };

  // Calculate days remaining
  const daysRemaining = votingDate 
    ? Math.ceil((new Date(votingDate) - new Date()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-[#F0EBF8]">
      <h2 className="text-2xl font-semibold text-[#4A2C82] mb-6 flex items-center gap-2">
        <Calendar className="text-[#6B4AA0]" /> Set Voting Date
      </h2>
      
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="votingDate" className="block text-sm font-medium text-[#5E5E5E] mb-1">
            Select Voting Date
          </label>
          <input
            type="date"
            id="votingDate"
            value={votingDate}
            onChange={(e) => {
              setVotingDate(e.target.value);
              setError('');
            }}
            className="w-full px-3 py-2 border border-[#D9D9D9] rounded-md shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-[#FFEBEE] text-[#C62828] rounded-md flex items-start gap-2">
            <AlertCircle className="mt-0.5 flex-shrink-0" size={16} />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#6B4AA0] text-white rounded-md hover:bg-[#5D3A8F] 
                      focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:ring-offset-2 
                      transition-colors shadow-md"
          >
            Set Voting Date
          </button>
          
          {success && (
            <div className="p-2 bg-[#E8F5E9] text-[#2E7D32] rounded-md border border-[#C8E6C9]">
              Voting date successfully updated!
            </div>
          )}
        </div>
      </form>

      {/* Current Voting Date Display */}
      {votingDate && (
        <div className="mt-8 border-t border-[#F0EBF8] pt-6">
          <h3 className="text-lg font-medium text-[#4A2C82] mb-2">Selected Voting Date</h3>
          <div className="bg-[#F9F5FF] p-4 rounded-lg border border-[#F0EBF8]">
            <p className="text-[#5E5E5E]">
              {new Date(votingDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-sm text-[#7C7C7C] mt-1">
              {daysRemaining} days from today
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetVotingDate;