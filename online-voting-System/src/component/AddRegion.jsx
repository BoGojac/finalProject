import { useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import AddRegionForm from './AddRegionForm';
import EditRegionForm from './EditRegionForm';
// import DeleteConfirmationModal from './ui/DeleteConfirmationModal';
import useRegionStore from '../store/regionStore';
import useVotingDateStore from '../store/votingDateStore';


const AddRegion = () => {
  const {
    regions, 
    loading,
    pagination,
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
  const { votingDates} = useVotingDateStore();

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

   const regionDataWithVotingTitle = useMemo(() => {
  return regions.map((region) => {
    const votingDate = votingDates.find((v) => v.id === region.voting_date_id);
    return {
      ...region,
      voting_date_title: votingDate ? votingDate.title : 'N/A',
    };
  });
}, [regions, votingDates]);

  const columns = [
    { key: 'name', header: 'Region Name' },
    { key: 'abbreviation', header: 'Region Abbreviation' },
    { key: 'voting_date_title', header: 'Voting Date' },

  ];

  return (
    <>
      <DataTable
        title="Regions"
        data={regionDataWithVotingTitle}
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


      {pagination && (
        <div className="flex gap-2 mt-4">
          {Array.from({ length: pagination.last_page }, (_, i) => (
            <button
              key={i}
              onClick={() => fetchRegions(i + 1)}
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
