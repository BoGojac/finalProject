import { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import CreateCandidateForm from './RegisterCandidatedForm';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([
    { 
      id: 1, 
      name: 'Abebe Kebede Mola', 
      gender: 'Male', 
      registration_date: '1/12/1996', 
      birth_date: '10/30/1987', 
      disability: 'Visual Impairment', 
      duration_of_residence: '',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Adugan Olani Geleta', 
      gender: 'Male', 
      registration_date: '1/12/1996', 
      birth_date: '10/30/1987', 
      disability: 'Visual Impairment', 
      duration_of_residence: '',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Tsegaab Anamo MRX', 
      gender: 'Male', 
      registration_date: '1/12/1996', 
      birth_date: '10/30/1987', 
      disability: 'Visual Impairment', 
      duration_of_residence: '',
      status: 'active'
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      setCandidates(candidates.filter(candidate => candidate.id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit candidate with ID: ${id}`);
    // Implement edit functionality
  };
  const handleToggleStatus = (candidateId, currentStatus) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: currentStatus === 'active' ? 'inactive' : 'active' } 
        : candidate
    ));
  };
  const handleAddCandidate = (newCandidate) => {
    setCandidates(prev => [
      ...prev,
      {
        ...newCandidate,
        id: Math.max(...prev.map(c => c.id)) + 1,
        name: `${newCandidate.firstName} ${newCandidate.middleName ? newCandidate.middleName + ' ' : ''}${newCandidate.lastName}`,
        registration_date: new Date().toLocaleDateString(),
        birth_date: newCandidate.birthDate,
        disability: newCandidate.disability === 'None' ? 'None' : newCandidate.disabilityType,
        duration_of_residence: `${newCandidate.residenceDuration} ${newCandidate.residenceUnit}`
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
        title="Candidate Management"
        data={candidates}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        addButtonText="Register New Candidate"
        addButtonIcon={Plus}
        onAdd={() => setIsFormOpen(true)}
        onToggleStatus={handleToggleStatus}
      />
      
      <CreateCandidateForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddCandidate}
      />
    </div>
  );
};

export default CandidateList;