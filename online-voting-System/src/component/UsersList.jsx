// import React from 'react';
import { useState } from 'react';
import {Plus} from 'lucide-react';
import CreateUserForm from './CreateUserForm';

const UsersList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', role: 'Polling Station', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '5551234567', role: 'Board Manager', status: 'inactive' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '4445556666', role: 'Constituency Manager', status: 'active' },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateNewUser = () => setShowCreateForm(true);
  const handleCloseForm = () => setShowCreateForm(false);

  const handleSubmitNewUser = (newUser) => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, {
      id: newId,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      phone: newUser.phoneNumber,
      role: newUser.role,
      status: 'active'
    }]);
    setShowCreateForm(false);
  };

  const handleToggleStatus = (userId, currentStatus) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: currentStatus === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleUpdate = (userId) => {
    // Implement your update logic here
    console.log(`Update user with ID: ${userId}`);
  };

  return (
    <div className="relative">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
          <button
            onClick={handleCreateNewUser}
            className="px-4 py-2 rounded-md bg-[#6B4AA0] text-white hover:bg-[#5a3b91] transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={18}/>
            Create New User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <button 
                        onClick={() => handleUpdate(user.id)}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-xs"
                    >
                        Update
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      className={`px-3 py-1 rounded-md text-xs ${
                        user.status === 'active' 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateForm && (
        <CreateUserForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitNewUser}
        />
      )}
    </div>
  );
};

export default UsersList;