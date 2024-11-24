import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Users, UserPlus, Shield, HomeIcon } from "lucide-react";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">RBAC Dashboard</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-4">
          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/dashboard"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700"
            } hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/users"
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/users"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700"
            } hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}
          >
            <Users className="h-5 w-5 mr-2" />
            Users
          </Link>
          <Link
            to="/roles"
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/roles"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700"
            } hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Roles
          </Link>
          <Link
            to="/permissions"
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/permissions"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700"
            } hover:bg-indigo-50 hover:text-indigo-600 transition-colors`}
          >
            <Shield className="h-5 w-5 mr-2" />
            Permissions
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
        </header>

        {/* Dashboard Info Section */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {location.pathname === "/dashboard" ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome, Admin!
                </h1>
                <p className="text-gray-600">
                  This is your dashboard where you can manage users, roles, and
                  permissions efficiently.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Cards */}
                  <div className="bg-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold text-indigo-800">
                      Total Users
                    </h3>
                    <p className="text-2xl font-bold text-indigo-900">120</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold text-green-800">
                      Roles Created
                    </h3>
                    <p className="text-2xl font-bold text-green-900">8</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold text-yellow-800">
                      Pending Requests
                    </h3>
                    <p className="text-2xl font-bold text-yellow-900">5</p>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;


