import React, { useState, useEffect } from 'react';
import { roleApi } from '../services/mockApi';
import { Plus, Edit, Trash2, X } from 'lucide-react';

function Roles() {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const fetchedRoles = await roleApi.getRoles();
      setRoles(fetchedRoles);
      setError(null);
    } catch (err) {
      setError('Failed to fetch roles');
    }
    setIsLoading(false);
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingRole(null);
    setIsCreating(true);
  };

  const handleSave = async (editedRole) => {
    try {
      if (isCreating) {
        await roleApi.createRole(editedRole);
      } else {
        await roleApi.updateRole(editedRole);
      }
      fetchRoles();
      setEditingRole(null);
      setIsCreating(false);
    } catch (err) {
      setError('Failed to save role');
    }
  };

  const handleDelete = async (roleId) => {
    try {
      await roleApi.deleteRole(roleId);
      fetchRoles();
    } catch (err) {
      setError('Failed to delete role');
    }
  };

  const RoleForm = ({ role, onSave, onCancel }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          id: role ? role.id : null,
          name: e.target.name.value,
          permissions: Array.from(e.target.permissions)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value),
        });
      }}
      className="space-y-4"
    >
      <input
        name="name"
        defaultValue={role ? role.name : ''}
        placeholder="Role Name"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Permissions:</label>
        <div className="grid grid-cols-2 gap-2">
          {['create', 'read', 'update', 'delete'].map((permission) => (
            <label key={permission} className="inline-flex items-center">
              <input
                type="checkbox"
                name="permissions"
                value={permission}
                defaultChecked={role ? role.permissions.includes(permission) : false}
                className="form-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 capitalize">{permission}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Role Management</h2>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Role
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(editingRole || isCreating) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {isCreating ? 'Create New Role' : 'Edit Role'}
              </h3>
              <button
                onClick={() => {
                  setEditingRole(null);
                  setIsCreating(false);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <RoleForm
              role={editingRole}
              onSave={handleSave}
              onCancel={() => {
                setEditingRole(null);
                setIsCreating(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;

