import { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import RegisterVoterForm from './RegisterVoter';

const VoterList = () => {
  const [voters, setVoters] = useState([
    { 
      id: 1, 
      name: 'Alemu Desta', 
      gender: 'Male', 
      registration_date: '3/15/2023', 
      birth_date: '5/22/1990',
      disability: 'None',
      duration_of_residence: '5 years',
      email: 'alemu.desta@example.com',
      phone: '+251911223344',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Birtukan Hailu', 
      gender: 'Female', 
      registration_date: '2/10/2023', 
      birth_date: '8/30/1985',
      disability: 'Hearing Impairment',
      duration_of_residence: '8 years',
      email: 'birtukan.h@example.com',
      phone: '+251922334455',
      status: 'inactive'
    },
    // ... other voters with status field
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this voter?')) {
      setVoters(voters.filter(voter => voter.id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit voter with ID: ${id}`);
    // Implement edit functionality
  };

  const handleToggleStatus = (voterId, currentStatus) => {
    setVoters(voters.map(voter => 
      voter.id === voterId 
        ? { ...voter, status: currentStatus === 'active' ? 'inactive' : 'active' } 
        : voter
    ));
  };

  const handleAddVoter = (newVoter) => {
    setVoters(prev => [
      ...prev,
      {
        ...newVoter,
        id: Math.max(...prev.map(v => v.id)) + 1,
        registration_date: new Date().toLocaleDateString(),
        status: 'active' // New voters are active by default
      }
    ]);
    setIsFormOpen(false);
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'gender', header: 'Gender' },
    { key: 'registration_date', header: 'Registration Date' },
    { key: 'birth_date', header: 'Birth Date' },
    { key: 'disability', header: 'Disability' },
    { key: 'duration_of_residence', header: 'Duration of Residence' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
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
    <div className="p-4">
      <DataTable
        title="Voter Management"
        data={voters}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        addButtonText="Register New Voter"
        addButtonIcon={Plus}
        onAdd={() => setIsFormOpen(true)}
        onToggleStatus={handleToggleStatus}
      />
      
      <RegisterVoterForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddVoter}
      />
    </div>
  );
};

export default VoterList;