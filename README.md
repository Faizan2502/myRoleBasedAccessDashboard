# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Role-Based Access Control (RBAC) Dashboard

This project is a **Role-Based Access Control (RBAC)** dashboard built using **React**. It allows you to manage users, roles, and permissions effectively. The project is modular, well-structured, and designed for scalability.

---

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)

---

## Folder Structure

Below is the folder structure followed in this project for better organization and modularity:

---

## Features

- **Dashboard**: Centralized control panel to manage roles, users, and permissions.
- **Role Management**: Add, edit, or delete roles.
- **User Management**: Manage user accounts and assign roles.
- **Permission Management**: Control access levels and manage permissions.
- **Responsive Design**: Works seamlessly on all devices.
- **Modular Codebase**: Well-organized components and pages for easy development.

---

## Prerequisites

Before starting, ensure you have the following installed on your system:

1. **Node.js** (>= 16.0.0)
2. **npm** or **yarn**

---

## Setup Instructions

Follow these steps to set up the project on your local system:

1. **Clone the Repository**
2. **Install Dependencies**
   npm install

3. **Start the Development Server**
   npm run dev

4.**Open the App**
Open your browser and navigate to http://localhost:5173.

---

## Usage

This application is a **Role-Based Access Control (RBAC) Dashboard** with the following key functionalities:

### 1. **Sidebar Navigation**

The sidebar acts as the primary navigation point for the dashboard. It contains links to the following sections:

- **Users**: Manage the list of users. Add, edit, or delete users and assign roles to them.
- **Roles**: View and manage available roles in the system. Define role-specific permissions.
- **Permissions**: Set up and customize permissions that can be assigned to roles for fine-grained access control.

The sidebar can be toggled open or closed on smaller screens for a responsive user experience. The links are styled with hover effects for better usability.

---

### 2. **Mock API**

The project uses a **Mock API** for demonstration and testing purposes. This allows you to simulate CRUD (Create, Read, Update, Delete) operations without a backend server.

- **Data Sources**:
  - Users: `mockUsers` contains sample user data (name, ID, and role).
  - Roles: `mockRoles` contains sample role data (role name and associated permissions).

---

### 3. **Main Dashboard**

When the application is launched:

- The **Main Dashboard** is the default landing page.
- It provides a quick overview of the admin system or relevant information.
- The layout ensures that the admin is greeted with key insights or helpful data visualization (this section can be customized to meet specific requirements).

---

### 4. **Responsive Design**

- The application is designed to be **mobile-friendly** and **responsive**.
- On small screens:
  - The sidebar is initially hidden but can be toggled using a menu button.
  - The layout dynamically adjusts to smaller screen sizes to maintain usability.

---

### 5. **Extensibility**

This RBAC system is built to be modular:

- **Adding new components**: You can create a new file in the `Components` folder and link it via a new route in `App.jsx`.
- **Enhancing functionality**: Expand the mock API with additional properties or integrate a real API service.

---
