import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import CreateCandidateForm from './RegisterCandidatedForm';
import EditCandidateForm from './EditCandidateForm';
import useCandidateStore from '../store/candidateStore';

const CandidateList = () => {
  const {
    candidates,
    fetchCandidates,
    isAddFormOpen,
    isEditFormOpen,
    openAddForm,
    closeAddForm,
    openEditForm,
    closeEditForm,
    selectedCandidate,
    toggleStatus,
  } = useCandidateStore();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (_, row) =>
        [row.first_name, row.middle_name, row.last_name].filter(Boolean).join(' ')
    },
    { key: 'gender', header: 'Gender' },
    { key: 'registration_date', header: 'Registration Date' },
    { key: 'birth_date', header: 'Birth Date' },
    { key: 'disability', header: 'Disability' },
    { key: 'disability_type', header: 'Disability Type' },
    { key: 'duration_of_residence', header: 'Duration of Residence' },
    {
        key: 'original_image_name',
        header: 'Image',
        render: (fileName, row) => (
          fileName ? (
            <a
              href={`http://127.0.0.1:8000/storage/${row.image}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {fileName}
            </a>
          ) : '-'
        ),
      },
      { key: 'candidate_type', header: 'Candidate Tpye' },
    {
      key: 'status',
      header: 'Status',
      render: (_, row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.user?.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.user?.status ?? 'Unknown'}
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
        onEdit={(id) => {
          const item = candidates.find((c) => c.id === id);
          openEditForm(item);
        }}
        addButtonText="Register New Candidate"
        addButtonIcon={Plus}
        onAdd={openAddForm}
        onToggleStatus={(id, status) => toggleStatus(id, status)}
      />

      <CreateCandidateForm
        isOpen={isAddFormOpen}
        onClose={closeAddForm}
        onSubmit={fetchCandidates}
      />

      <EditCandidateForm
        isOpen={isEditFormOpen}
        onClose={closeEditForm}
        onSuccess={fetchCandidates}
        candidate={selectedCandidate}
      />
    </div>
  );
};

export default CandidateList;
