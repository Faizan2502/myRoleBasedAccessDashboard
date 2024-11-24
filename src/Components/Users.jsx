import React, { useState, useEffect } from 'react';
import { userApi } from '../services/mockApi';
import { Plus, Edit, Trash2, X } from 'lucide-react';

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await userApi.getUsers();
      setUsers(fetchedUsers);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    }
    setIsLoading(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setIsCreating(true);
  };

  const handleSave = async (editedUser) => {
    try {
      if (isCreating) {
        await userApi.createUser(editedUser);
      } else {
        await userApi.updateUser(editedUser);
      }
      fetchUsers();
      setEditingUser(null);
      setIsCreating(false);
    } catch (err) {
      setError('Failed to save user');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await userApi.deleteUser(userId);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const UserForm = ({ user, onSave, onCancel }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave({
        id: user ? user.id : null,
        name: e.target.name.value,
        email: e.target.email.value,
        role: e.target.role.value,
        status: e.target.status.value
      });
    }} className="space-y-4">
      <input name="name" defaultValue={user ? user.name : ''} placeholder="Name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
      <input name="email" defaultValue={user ? user.email : ''} placeholder="Email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required type="email" />
      <select name="role" defaultValue={user ? user.role : 'Viewer'} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
      </select>
      <select name="status" defaultValue={user ? user.status : 'Active'} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
      </div>
    </form>
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
        <button onClick={handleCreate} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <Plus className="h-5 w-5 mr-2" />
          Add New User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(editingUser || isCreating) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{isCreating ? 'Create New User' : 'Edit User'}</h3>
              <button onClick={() => { setEditingUser(null); setIsCreating(false); }} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <UserForm 
              user={editingUser} 
              onSave={handleSave} 
              onCancel={() => {
                setEditingUser(null);
                setIsCreating(false);
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;

