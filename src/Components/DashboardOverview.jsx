import React from 'react';

const DashboardOverview = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the RBAC Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage Users, Roles, and Permissions efficiently with this role-based access control system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-indigo-600">Total Users</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">124</p>
        </div>

        {/* Roles Card */}
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-green-600">Total Roles</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">8</p>
        </div>

        {/* Permissions Card */}
        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-red-600">Total Permissions</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">15</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
