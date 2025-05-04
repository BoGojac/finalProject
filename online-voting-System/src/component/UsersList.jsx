import { useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../component/ui/Table';
import CreateUserForm from './CreateUserForm';

const UsersList = () => {
  const [users, setUsers] = useState([
    { 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '1234567890', 
      role: 'Admin', 
      status: 'active' 
    },
    { 
      
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '9876543210', 
      role: 'Polling Station', 
      status: 'active' 
    },
    { 
      
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      phone: '5551234567', 
      role: 'Board Manager', 
      status: 'inactive' 
    },
    { 
    
      name: 'Alice Williams', 
      email: 'alice@example.com', 
      phone: '4445556666', 
      role: 'Constituency Manager', 
      status: 'active' 
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
    // Implement edit functionality
  };

  const handleToggleStatus = (userId, currentStatus) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: currentStatus === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  const handleAddUser = (newUser) => {
    setUsers(prev => [
      ...prev,
      {
        ...newUser,
        id: Math.max(...prev.map(u => u.id)) + 1,
        name: `${newUser.firstName} ${newUser.lastName}`,
        phone: newUser.phoneNumber, // Map phoneNumber to phone
        status: 'active' // New users are active by default
      }
    ]);
    setIsFormOpen(false);
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'role', header: 'Role' },
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
    <div className="p-4 relative">
      <DataTable
        title="User Management"
        data={users}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        addButtonText="Create New User"
        addButtonIcon={Plus}
        onAdd={() => setIsFormOpen(true)}
        onToggleStatus={handleToggleStatus}
      />
      
      {isFormOpen && (
        <CreateUserForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  );
};

export default UsersList;