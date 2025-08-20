import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';;
import CreatePartyForm from './CreatePartyForm';
import usePartyStore from '../store/partyStore';
import axios from 'axios';
// import DeleteConfirmationModal from './ui/DeleteConfirmationModal';
import EditPartyForm from './EditPartyForm';

const PartyList = () => {

  const {
    parties,
    pagination,
    fetchParties,
    openAddForm,
    closeAddForm,
    isAddFormOpen,
    isEditFormOpen,
    openEditForm,
    closeEditForm,
    selectedParty,
    // deleteModal,
    openDeleteModal,
    // closeDeleteModal,
    // confirmDeleteParty
  } = usePartyStore();
  
   useEffect(() => {
    fetchParties();
  }, [fetchParties]);


    const columns = [
      { key: 'name', header: 'Party Name' },
      { key: 'abbrevation', header: 'Abbreviation' },
      { key: 'leader', header: 'Leader' },
      { key: 'foundation_year', header: 'Founded' },
      { key: 'headquarters', header: 'Headquarters' },
      { key: 'participation_area', header: 'Participation Area' },
      { key: 'region_name', header: 'Region' },
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

      {
        key: 'status',
        header: 'Status',
        render: (value) => (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {value}
          </span>
        ),
      },
    ];

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

      await axios.patch(`http://127.0.0.1:8000/api/party/status/${id}`, {
        status: newStatus, // send status here
      });

      fetchParties();
    } catch (error) {
      console.error('Failed to toggle status:', error.response?.data || error.message);
    }
  };


  return (
    <>
      <DataTable
        title="Political Party Management"
        data={Array.isArray(parties) ? parties : []} 
        columns={columns}
        onDelete={(id) => {
          const item = parties.find(c => c.id === id);
          openDeleteModal(item);
        }}
        onEdit={(id) => {
          const item = parties.find(c => c.id === id);
          openEditForm(item);
        }}
        addButtonText="Add Party"
        addButtonIcon={Plus}
        onAdd={openAddForm}
        onToggleStatus={handleToggleStatus}
      />


      {pagination && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: pagination.last_page }, (_, i) => (
            <button
              key={i}
              onClick={() => fetchParties(i + 1)}
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

    
    <CreatePartyForm
         isOpen={isAddFormOpen}
        onClose={closeAddForm}
        onSuccess={fetchParties}
    />

     <EditPartyForm
        isOpen={isEditFormOpen}
        onClose={closeEditForm}
        onSuccess={fetchParties}
        party={selectedParty}
      />
    
      {/* Delete Modal */}
      {/* <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteParty}
        itemName={deleteModal.party?.name || ''}
        isLoading={deleteModal.isLoading}
      /> */}
    </>
    
  );
};

export default PartyList;