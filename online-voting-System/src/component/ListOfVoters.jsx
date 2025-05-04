import { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import RegisterVoterForm from './RegisterVoter'; // You'll need to create this form component

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
      phone: '+251911223344'
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
      phone: '+251922334455'
    },
    { 
      id: 3, 
      name: 'Chala Worku', 
      gender: 'Male', 
      registration_date: '4/5/2023', 
      birth_date: '11/12/1978',
      disability: 'None',
      duration_of_residence: '12 years',
      email: 'chala.w@example.com',
      phone: '+251933445566'
    },
    { 
      id: 4, 
      name: 'Dawit Mekonnen', 
      gender: 'Male', 
      registration_date: '1/20/2023', 
      birth_date: '7/5/1995',
      disability: 'Visual Impairment',
      duration_of_residence: '3 years',
      email: 'dawit.m@example.com',
      phone: '+251944556677'
    },
    { 
      id: 5, 
      name: 'Etenesh Alemu', 
      gender: 'Female', 
      registration_date: '5/30/2023', 
      birth_date: '9/18/1988',
      disability: 'None',
      duration_of_residence: '7 years',
      email: 'etenesh.a@example.com',
      phone: '+251955667788'
    },
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

  const handleAddVoter = (newVoter) => {
    setVoters(prev => [
      ...prev,
      {
        ...newVoter,
        id: Math.max(...prev.map(v => v.id)) + 1,
        registration_date: new Date().toLocaleDateString(),
        // Add any other transformations needed
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
      />
      
      {/* You'll need to create this RegisterVoterForm component similar to CreateCandidateForm */}
      <RegisterVoterForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddVoter}
      />
    </div>
  );
};

export default VoterList;