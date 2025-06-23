import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import DataTable from '../component/ui/Table';
import CreateUserForm from './CreateUserForm';
// import EditUserForm from './EditUserForm'; 
import useUserStore from '../store/userStore.js'; 
const UsersList = () => {
  const {
    users,
    fetchUsers,
    isAddFormOpen,
    // isEditFormOpen,
    openAddForm,
    closeAddForm,
    openEditForm,
    // closeEditForm,
    // selectedUser,
  } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    { key: 'username', header: 'Username' },
    { key: 'email', header: 'Email' },
    { key: 'phone_number', header: 'Phone' },
    { key: 'role', header: 'Role' },
    {
      key: 'full_name',
      header: 'Name',
      render: (_, row) =>
        [row.first_name, row.middle_name, row.last_name].filter(Boolean).join(' ')
    },
    { key: 'gender', header: 'Gender' },
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

      await axios.patch(`http://127.0.0.1:8000/api/user/status/${id}`, {
        status: newStatus,
      });

      fetchUsers();
    } catch (error) {
      console.error('Failed to toggle status:', error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4 relative">
      <DataTable
        title="User Management"
        data={users}
        columns={columns}
        onEdit={(id) => {
          const item = users.find((u) => u.id === id);
          openEditForm(item);
        }}
        addButtonText="Create New User"
        addButtonIcon={Plus}
        onAdd={openAddForm}
        onToggleStatus={handleToggleStatus}
      />

      {/* Create User Form */}
      <CreateUserForm
        isOpen={isAddFormOpen}
        onClose={closeAddForm}
        onSuccess={fetchUsers} 
      />

      {/* Edit User Form */}
      {/* <EditUserForm
        isOpen={isEditFormOpen}
        onClose={closeEditForm}
        onSuccess={fetchUsers}
        user={selectedUser}
      /> */}
    </div>
  );
};

export default UsersList;
