//import React from 'react';
import { useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

const SetVotingDate = () => {
  const [title, setTitle] = useState('');
  const [votingDate, setVotingDate] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title) {
      setError('Please enter a title for the voting');
      return;
    }

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
    console.log('Voting title:', title);
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
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-[#F0EBF8]">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#4A2C82] mb-4 sm:mb-6 flex items-center gap-2">
        <Calendar className="text-[#6B4AA0]" /> Set Voting Date
      </h2>
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="space-y-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#5E5E5E] mb-1">
              Set Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="Enter title of the voting"
              className="w-full px-3 py-2 text-sm sm:text-base border border-[#D9D9D9] rounded-md shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
            />
          </div>
          
          <div>
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
              className="w-full px-3 py-2 text-sm sm:text-base border border-[#D9D9D9] rounded-md shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-2 text-sm sm:text-base bg-[#FFEBEE] text-[#C62828] rounded-md flex items-start gap-2">
            <AlertCircle className="mt-0.5 flex-shrink-0" size={16} />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-[#6B4AA0] text-white rounded-md hover:bg-[#5D3A8F] 
                      focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:ring-offset-2 
                      transition-colors shadow-md text-sm sm:text-base"
          >
            Set Voting Date
          </button>
          
          {success && (
            <div className="w-full sm:w-auto p-2 text-sm sm:text-base bg-[#E8F5E9] text-[#2E7D32] rounded-md border border-[#C8E6C9]">
              Voting date successfully updated!
            </div>
          )}
        </div>
      </form>

      {/* Current Voting Date Display */}
      {votingDate && (
        <div className="mt-6 sm:mt-8 border-t border-[#F0EBF8] pt-4 sm:pt-6">
          <h3 className="text-base sm:text-lg font-medium text-[#4A2C82] mb-2">Selected Voting Date</h3>
          <div className="bg-[#F9F5FF] p-3 sm:p-4 rounded-lg border border-[#F0EBF8]">
            <p className="text-sm sm:text-base text-[#5E5E5E]">
              {new Date(votingDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-xs sm:text-sm text-[#7C7C7C] mt-1">
              {daysRemaining} days from today
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetVotingDate;