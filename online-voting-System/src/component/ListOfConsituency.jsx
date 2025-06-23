import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import CreateConstituencyForm from './CreateConstituencyForm';
import useConstituencyStore from '../store/constituencyStore'; 
import EditConstituencyForm from './EditConstituencyForm'; 
import DeleteConfirmationModal from './ui/DeleteConfirmationModal';

const ConstituencyList = () => { 
  const {
    constituencies,
    fetchConstituencies,
    openAddForm,
    closeAddForm,
    isAddFormOpen,
    isEditFormOpen,
    openEditForm,
    closeEditForm,
    selectedConstituency,
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteConstituency
  } = useConstituencyStore();

  useEffect(() => {
    fetchConstituencies();
  }, [fetchConstituencies]);

  const columns = [
    { key: 'name', header: 'Constituency Name' },
    { key: 'region_name', header: 'Region' },
    {
      key: 'longitude',
      header: 'Longitude',
      render: (value) => Number(value).toFixed(4)
    },
    {
      key: 'latitude',
      header: 'Latitude',
      render: (value) => Number(value).toFixed(4)
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
    }
  ];

  return (
    <>
      <DataTable
        title="Constituency Management"
        data={constituencies}
        columns={columns}
        onDelete={(id) => {
          const item = constituencies.find(c => c.id === id);
          openDeleteModal(item);
        }}
        onEdit={(id) => {
          const item = constituencies.find(c => c.id === id);
          openEditForm(item);
        }}
        addButtonText="Add Constituency"
        addButtonIcon={Plus}
        onAdd={openAddForm}
      />

      {/* Add Form */}
      <CreateConstituencyForm
        isOpen={isAddFormOpen}
        onClose={closeAddForm}
        onSuccess={fetchConstituencies}
      />

      {/* Edit Form */}
      <EditConstituencyForm
        isOpen={isEditFormOpen}
        onClose={closeEditForm}
        onSuccess={fetchConstituencies}
        constituency={selectedConstituency}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteConstituency}
        itemName={deleteModal.constituency?.name || ''}
        isLoading={deleteModal.isLoading}
      />

    </>
  );
};

export default ConstituencyList;