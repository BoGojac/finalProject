//import React from 'react';
import { useState } from 'react';
import { AlertTriangle, Check, ChevronDown, ChevronUp, Search } from 'lucide-react';

const OverrideVoting = () => {
  // Mock data organized by regions
  const regions = [
    {
      id: 1,
      name: 'Addis Ababa',
      constituencies: [
        { 
          id: 1, 
          name: 'Addis Ababa Central', 
          pollingStations: [
            { id: 101, name: 'Station A' },
            { id: 102, name: 'Station B' }
          ]
        },
        { 
          id: 2, 
          name: 'Bole Sub-City', 
          pollingStations: [
            { id: 201, name: 'Bole Station' },
            { id: 202, name: 'Alem Bank' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Oromia',
      constituencies: [
        { 
          id: 3, 
          name: 'Finfinne Special Zone', 
          pollingStations: [
            { id: 301, name: 'Adama Station' },
            { id: 302, name: 'Bishoftu Station' }
          ]
        },
        { 
          id: 4, 
          name: 'West Shewa', 
          pollingStations: [
            { id: 401, name: 'Ambo Station' },
            { id: 402, name: 'Guder Station' }
          ]
        }
      ]
    }
  ];

  const [overrideLevel, setOverrideLevel] = useState('none');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [selectedPollingStation, setSelectedPollingStation] = useState(null);
  const [reason, setReason] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter constituencies based on search term
  const filteredConstituencies = selectedRegion 
    ? selectedRegion.constituencies.filter(constituency =>
        constituency.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Filter polling stations based on search term
  const filteredPollingStations = selectedConstituency
    ? selectedConstituency.pollingStations.filter(station =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleOverride = async () => {
    if (!reason) {
      setErrorMessage('Please provide a reason for the override');
      return;
    }

    try {
      let scope = '';
      if (overrideLevel === 'all') scope = 'entire election';
      if (overrideLevel === 'constituency') scope = `constituency: ${selectedConstituency?.name}`;
      if (overrideLevel === 'polling') scope = `polling station: ${selectedPollingStation?.name}`;

      // Mock API call would go here
      setSuccessMessage(`Voting successfully overridden for ${scope}`);
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 5000);

      // Reset form
      setOverrideLevel('none');
      setSelectedRegion(null);
      setSelectedConstituency(null);
      setSelectedPollingStation(null);
      setReason('');
      setSearchTerm('');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Override error:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-[#F0EBF8]">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-[#4A2C82] flex items-center gap-2">
          <AlertTriangle className="text-red-600" /> Override Voting Process
        </h2>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* Error/Success Messages */}
          {errorMessage && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
              <AlertTriangle size={18} /> {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md flex items-center gap-2">
              <Check size={18} /> {successMessage}
            </div>
          )}

          {/* Override Scope Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#4A2C82]">Override Scope</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setOverrideLevel('all');
                  setSelectedRegion(null);
                  setSelectedConstituency(null);
                  setSelectedPollingStation(null);
                }}
                className={`p-4 border rounded-md text-center transition-colors ${
                  overrideLevel === 'all'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Entire Election
              </button>
              <button
                onClick={() => {
                  setOverrideLevel('constituency');
                  setSelectedPollingStation(null);
                }}
                className={`p-4 border rounded-md text-center transition-colors ${
                  overrideLevel === 'constituency'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Specific Constituency
              </button>
              <button
                onClick={() => {
                  setOverrideLevel('polling');
                  setSelectedConstituency(null);
                }}
                className={`p-4 border rounded-md text-center transition-colors ${
                  overrideLevel === 'polling'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Specific Polling Station
              </button>
            </div>
          </div>

          {/* Region Selection */}
          {(overrideLevel === 'constituency' || overrideLevel === 'polling') && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#5E5E5E]">Select Region</label>
              <select
                value={selectedRegion?.id || ''}
                onChange={(e) => {
                  const selected = regions.find(r => r.id === parseInt(e.target.value));
                  setSelectedRegion(selected);
                  setSelectedConstituency(null);
                  setSelectedPollingStation(null);
                  setSearchTerm('');
                }}
                className="w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
              >
                <option value="">Select a region</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* CONSTITUENCY-LEVEL OVERRIDE */}
          {overrideLevel === 'constituency' && selectedRegion && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#5E5E5E]">
                  Search Constituencies
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by constituency name..."
                    className="w-full p-2 pl-10 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#5E5E5E]">Select Constituency</label>
                <select
                  value={selectedConstituency?.id || ''}
                  onChange={(e) => {
                    const selected = filteredConstituencies.find(c => c.id === parseInt(e.target.value));
                    setSelectedConstituency(selected);
                  }}
                  className="w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                >
                  <option value="">Select a constituency</option>
                  {filteredConstituencies.map((constituency) => (
                    <option key={constituency.id} value={constituency.id}>
                      {constituency.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* POLLING-STATION-LEVEL OVERRIDE */}
          {overrideLevel === 'polling' && selectedRegion && (
            <>
              {/* Step 1: Select Constituency */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#5E5E5E]">
                  Search Constituencies
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by constituency name..."
                    className="w-full p-2 pl-10 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#5E5E5E]">Select Constituency</label>
                <select
                  value={selectedConstituency?.id || ''}
                  onChange={(e) => {
                    const selected = filteredConstituencies.find(c => c.id === parseInt(e.target.value));
                    setSelectedConstituency(selected);
                    setSearchTerm(''); // Reset search for polling stations
                  }}
                  className="w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                >
                  <option value="">Select a constituency</option>
                  {filteredConstituencies.map((constituency) => (
                    <option key={constituency.id} value={constituency.id}>
                      {constituency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Select Polling Station (only shows after constituency is selected) */}
              {selectedConstituency && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#5E5E5E]">
                      Search Polling Stations
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by polling station name..."
                        className="w-full p-2 pl-10 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#5E5E5E]">Select Polling Station</label>
                    <select
                      value={selectedPollingStation?.id || ''}
                      onChange={(e) => {
                        const selected = filteredPollingStations.find(
                          ps => ps.id === parseInt(e.target.value)
                        );
                        setSelectedPollingStation(selected);
                      }}
                      className="w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
                    >
                      <option value="">Select a polling station</option>
                      {filteredPollingStations.map((station) => (
                        <option key={station.id} value={station.id}>
                          {station.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </>
          )}

          {/* Reason Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#5E5E5E]">
              Reason for Override <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full p-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] focus:border-[#6B4AA0]"
              placeholder="Provide detailed reason for overriding the voting process..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleOverride}
              disabled={
                overrideLevel === 'none' ||
                (overrideLevel === 'constituency' && !selectedConstituency) ||
                (overrideLevel === 'polling' && (!selectedConstituency || !selectedPollingStation)) ||
                !reason
              }
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Override Voting Process
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverrideVoting;