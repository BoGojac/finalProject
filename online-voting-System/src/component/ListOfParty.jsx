import { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';;
import CreatePartyForm from './CreatePartyForm';

const PartyList = () => {
  const [parties, setParties] = useState([
    { 
      id: 1, 
      name: 'Prosperity Party', 
      abbreviation: 'PP', 
      leader: 'Abiy Ahmed', 
      foundingYear: 2019,
      headquarters: 'Addis Ababa',
      status: 'active'
    },
    // ... other parties
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this party?')) {
      setParties(parties.filter(party => party.id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit party with ID: ${id}`);
  };
  const handleToggleStatus = (partyId, currentStatus) => {
    setParties(parties.map(party => 
      party.id === partyId 
        ? { ...party, status: currentStatus === 'active' ? 'inactive' : 'active' } 
        : party
    ));
  };
  const handleAddParties = (newParty) => {
    // In a real app, you would call your API here
    setParties(prev => [
      ...prev,
      {
        ...newParty,
        id: Math.max(...prev.map(c => c.id)) + 1
      }
    ]);
  };

  const columns = [
    { key: 'name', header: 'Party Name' },
    { key: 'abbreviation', header: 'Abbreviation' },
    { key: 'leader', header: 'Leader' },
    { key: 'foundingYear', header: 'Founded' },
    { key: 'headquarters', header: 'Headquarters' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <>
    <DataTable
      title="Political Party Management"
      data={parties}
      columns={columns}
      onDelete={handleDelete}
      onEdit={handleEdit}
      addButtonText="Add New Party"
      addButtonIcon={Plus}
      onAdd={() => setIsFormOpen(true)}
      onToggleStatus={handleToggleStatus}
    />
    
    <CreatePartyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddParties}
      />
    </>
    
  );
};

export default PartyList;