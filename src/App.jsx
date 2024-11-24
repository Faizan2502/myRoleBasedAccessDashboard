// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './Components/Dashboard';
// import Users from './Components/Users';
// import Roles from './Components/Roles';
// import Permissions from './Components/Permissions';

// function App() {
//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100">
//         <Routes>
//           <Route path="/" element={<Dashboard />}>
//             <Route index element={<Users />} />
//             <Route path="roles" element={<Roles />} />
//             <Route path="permissions" element={<Permissions />} />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


//***************** */
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './Components/Dashboard';
// import UsersPage from './pages/UsersPage';
// import RolesPage from './pages/RolesPage';
// import PermissionsPage from './pages/PermissionsPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />}>
//           <Route index element={<UsersPage />} />
//           <Route path="roles" element={<RolesPage />} />
//           <Route path="permissions" element={<PermissionsPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


//new with dashboard overview

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import DashboardOverview from './Components/DashboardOverview';
import UsersPage from './pages/UsersPage';
import RolesPage from './pages/RolesPage';
import PermissionsPage from './pages/PermissionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="permissions" element={<PermissionsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
