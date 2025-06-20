import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import CreatePollingStationForm from './CreatePollingStationForm';
import EditPollingStationForm from './EditPollingStationForm';
import DeleteConfirmationModal from './ui/DeleteConfirmationModal';
import usePollingStationStore from '../store/pollingStationStore'; // ✅ Use correct store

const PollingStationList = () => {
  const {
    pollingStations,
    fetchPollingStations,
    isAddFormOpen,
    openAddForm,
    closeAddForm,
    isEditFormOpen,
    openEditForm,
    closeEditForm,
    selectedPollingStation,
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDeletePollingStation // ✅ Should be specific to polling station
  } = usePollingStationStore();

  useEffect(() => {
    fetchPollingStations();
  }, [fetchPollingStations]);

  const columns = [
    { key: 'name', header: 'Polling Station Name' },
    { key: 'constituency_name', header: 'Constituency' }, // backend must provide this
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
    }
  ];

  return (
    <>
      <DataTable
        title="Polling Station Management"
        data={pollingStations}
        columns={columns}
        onDelete={(id) => {
          const item = pollingStations.find(p => p.id === id);
          openDeleteModal(item);
        }}
        onEdit={(id) => {
          const item = pollingStations.find(p => p.id === id);
          console.log("Editing:", item); // ✅ Check that region_id is present
          openEditForm(item);
        }}
        addButtonText="Add Polling Station"
        addButtonIcon={Plus}
        onAdd={openAddForm}
      />

      {/* Create Form */}
      <CreatePollingStationForm
        isOpen={isAddFormOpen}
        onClose={closeAddForm}
        onSuccess={fetchPollingStations}
      />

      {/* Edit Form */}
      <EditPollingStationForm
        isOpen={isEditFormOpen}
        onClose={closeEditForm}
        onSuccess={fetchPollingStations}
        pollingStation={selectedPollingStation}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeletePollingStation}
        itemName={deleteModal.pollingStation?.name || ''}
        isLoading={deleteModal.isLoading}
      />
    </>
  );
};

export default PollingStationList;
