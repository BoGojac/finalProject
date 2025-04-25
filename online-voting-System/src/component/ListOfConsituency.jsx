import { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import CreateConstituencyForm from './CreateConstituencyForm';

const ConstituencyList = () => {
  const [constituencies, setConstituencies] = useState([
    { id: 1, name: 'Addis Ababa Central', region: 'Addis Ababa', longitude: 38.7636, latitude: 9.0054 },
    { id: 2, name: 'Oromia East', region: 'Oromia', longitude: 39.5434, latitude: 8.5263 },
    { id: 3, name: 'Amhara North', region: 'Amhara', longitude: 37.4833, latitude: 11.5936 },
    { id: 4, name: 'SNNP South', region: 'SNNP', longitude: 36.9541, latitude: 6.8412 },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this constituency?')) {
      setConstituencies(constituencies.filter(constituency => constituency.id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit constituency with ID: ${id}`);
    // You would typically open a modal or navigate to an edit page here
  };

  const handleAddConstituency = (newConstituency) => {
    // In a real app, you would call your API here
    setConstituencies(prev => [
      ...prev,
      {
        ...newConstituency,
        id: Math.max(...prev.map(c => c.id)) + 1
      }
    ]);
  };

  const columns = [
    { key: 'name', header: 'Constituency Name' },
    { key: 'region', header: 'Region' },
    { 
      key: 'longitude', 
      header: 'Longitude',
      render: (value) => value.toFixed(4) // Format to 4 decimal places
    },
    { 
      key: 'latitude', 
      header: 'Latitude',
      render: (value) => value.toFixed(4) // Format to 4 decimal places
    }
  ];

  return (
    <>
      <DataTable
        title="Constituency Management"
        data={constituencies}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        addButtonText="Add Constituency"
        addButtonIcon={Plus}
        onAdd={() => setIsFormOpen(true)}
      />
      
      <CreateConstituencyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddConstituency}
      />
    </>
  );
};

export default ConstituencyList;