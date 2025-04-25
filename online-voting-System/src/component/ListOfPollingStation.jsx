import { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import CreatePollingStationForm from './CreatePollingStationForm';

const PollingStationList = () => {
  const [pollingStations, setPollingStations] = useState([
    { id: 1, name: 'Bole School', constituency: 'Addis Ababa Central', longitude: 38.7999, latitude: 8.9806 },
    // ... other stations
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this polling station?')) {
      setPollingStations(pollingStations.filter(station => station.id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit polling station with ID: ${id}`);
  };

  const handleAddPollingStation = (newPollingStation) => {
    // In a real app, you would call your API here
    setPollingStations(prev => [
      ...prev,
      {
        ...newPollingStation,
        id: Math.max(...prev.map(c => c.id)) + 1
      }
    ]);
  };

  const columns = [
    { key: 'name', header: 'Polling Station Name' },
    { key: 'constituency', header: 'Constituency' },
    { key: 'longitude', header: 'Longitude' },
    { key: 'latitude', header: 'Latitude' }
  ];

  return (
    <>
    
    <DataTable
      title="Polling Station Management"
      data={pollingStations}
      columns={columns}
      onDelete={handleDelete}
      onEdit={handleEdit}
      addButtonText="Add Polling Station"
      addButtonIcon={Plus}
      onAdd={() => setIsFormOpen(true)}
    />

    <CreatePollingStationForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleAddPollingStation}
          />

    </>
    
  );
};

export default PollingStationList;