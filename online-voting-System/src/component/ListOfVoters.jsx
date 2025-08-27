import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Plus, Edit2 } from 'lucide-react';
import DataTable from '../component/ui/Table';
import RegisterVoterForm from './RegisterVoter';
import EditVoterForm from './EditVoterForm';
import useVoterStore from '../store/voterStore';

const VoterList = () => {
  const location = useLocation();
  const showAddButton = location.pathname === "/PollingStation/register-voter";
  const {
    voters,
    pagination,
    fetchVoters,
    isAddFormOpen,
    isEditFormOpen,
    openAddForm,
    closeAddForm,
    openEditForm,
    closeEditForm,
    selectedVoter,
    toggleStatus,
  } = useVoterStore();

  useEffect(() => {
    fetchVoters();
  }, [fetchVoters]);

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (_, row) => [row.first_name, row.middle_name, row.last_name].filter(Boolean).join(' ')
    },
    { key: 'gender', header: 'Gender' },
    { key: 'registration_date', header: 'Registration Date' },
    { key: 'birth_date', header: 'Birth Date' },
    { key: 'disability', header: 'Disability' },
    { key: 'disability_type', header: 'Disability Type' },
    { key: 'duration_of_residence', header: 'Duration of Residence' },
    { key: 'home_number', header: 'Home Number' },
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
             title="Voter Management"
             data={voters}
             columns={columns}
             onEdit={(id) => {
               const item = voters.find((c) => c.id === id);
               openEditForm(item);
             }}
             {...(showAddButton && {
               addButtonText: "Register New Voter",
               addButtonIcon: Plus,
               onAdd: openAddForm,
             })}
             onToggleStatus={(id, status) => toggleStatus(id, status)}
             renderActions={(item) => (
               <>
                 <button
                   onClick={() => openEditForm(item)}
                   className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-xs flex items-center gap-1"
                 >
                   <Edit2 className="h-3 w-3" /> Edit
                 </button>
                 {item.user && (
                   <button
                     onClick={() => toggleStatus(item.user.id, item.user.status)}
                     className={`px-3 py-1 rounded-md text-xs flex items-center gap-1 ${
                       item.user.status === "active"
                         ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                         : "bg-green-100 text-green-800 hover:bg-green-200"
                     }`}
                   >
                     {item.user.status === "active" ? "Deactivate" : "Activate"}
                   </button>
                 )}
               </>
             )}
           />


      {pagination && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: pagination.last_page }, (_, i) => (
            <button
              key={i}
              onClick={() => fetchVoters(i + 1)}
              className={`px-3 py-1 rounded-md border ${
                pagination.current_page === i + 1
                  ? 'bg-purple-800 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <RegisterVoterForm
        isOpen={isAddFormOpen}
        onClose={closeAddForm}
        onSubmit={fetchVoters}
      />

      <EditVoterForm
        isOpen={isEditFormOpen}
        onClose={closeEditForm}
        onSuccess={fetchVoters}
        voter={selectedVoter}
      />
    </div>
  );
};

export default VoterList;
