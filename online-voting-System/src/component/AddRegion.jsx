import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import AddRegionForm from './AddRegionForm';
import EditRegionForm from './EditRegionForm';
// import DeleteConfirmationModal from './ui/DeleteConfirmationModal';
import useRegionStore from '../store/regionStore';

const AddRegion = () => {
  const {
    regions,
    loading,
    error,
    fetchRegions,
    isAddFormOpen,
    isEditFormOpen,
    selectedRegion,
    openAddForm,
    closeAddForm,
    openEditForm,
    closeEditForm,
    // deleteModal,
    openDeleteModal,
    // closeDeleteModal,
    // confirmDeleteRegion,
  } = useRegionStore();

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  const columns = [
    { key: 'name', header: 'Region Name' },
    { key: 'abbreviation', header: 'Region Abbreviation' },
  ];

  return (
    <>
      <DataTable
        title="Regions"
        data={regions}
        columns={columns}
        onDelete={(id) => {
          const region = regions.find((r) => r.id === id);
          if (region) openDeleteModal(region);
        }}
        onEdit={(id) => {
          const region = regions.find((r) => r.id === id);
          if (region) openEditForm(region);
        }}
        addButtonText="Add Region"
        addButtonIcon={Plus}
        onAdd={openAddForm}
      />

      {loading && <p>Loading regions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <AddRegionForm
        isOpen={isAddFormOpen}
        onClose={closeAddForm}
        onSuccess={fetchRegions}
      />

      <EditRegionForm
        isOpen={isEditFormOpen}
        onClose={closeEditForm}
        onSuccess={fetchRegions}
        region={selectedRegion}
      />

      {/* <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteRegion}
        itemName={deleteModal.region?.name || 'this region'}
        isLoading={deleteModal.isLoading}
      /> */}
    </>
  );
};

export default AddRegion;
