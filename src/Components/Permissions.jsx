import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const initialPermissions = [
  { id: 1, name: 'create', description: 'Allows creating new resources' },
  { id: 2, name: 'read', description: 'Allows reading existing resources' },
  { id: 3, name: 'update', description: 'Allows updating existing resources' },
  { id: 4, name: 'delete', description: 'Allows deleting existing resources' },
];

function Permissions() {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [editingPermission, setEditingPermission] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (permission) => {
    setEditingPermission(permission);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingPermission(null);
    setIsCreating(true);
  };

  const handleSave = (editedPermission) => {
    if (isCreating) {
      setPermissions([...permissions, { ...editedPermission, id: Date.now() }]);
    } else {
      setPermissions(
        permissions.map((permission) =>
          permission.id === editedPermission.id ? editedPermission : permission
        )
      );
    }
    setEditingPermission(null);
    setIsCreating(false);
  };

  const handleDelete = (permissionId) => {
    setPermissions(permissions.filter((permission) => permission.id !== permissionId));
  };

  const PermissionForm = ({ permission, onSave, onCancel }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          id: permission ? permission.id : null,
          name: e.target.name.value,
          description: e.target.description.value,
        });
      }}
      className="space-y-4"
    >
      <input
        name="name"
        defaultValue={permission ? permission.name : ''}
        placeholder="Permission Name"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <textarea
        name="description"
        defaultValue={permission ? permission.description : ''}
        placeholder="Description"
        rows="3"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Permissions Management</h2>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Permission
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permission Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td className="px-6 py-4 whitespace-nowrap">{permission.name}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  {permission.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(permission)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(permission.id)}
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
      {(editingPermission || isCreating) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {isCreating ? 'Create New Permission' : 'Edit Permission'}
              </h3>
              <button
                onClick={() => {
                  setEditingPermission(null);
                  setIsCreating(false);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <PermissionForm
              permission={editingPermission}
              onSave={handleSave}
              onCancel={() => {
                setEditingPermission(null);
                setIsCreating(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Permissions;
