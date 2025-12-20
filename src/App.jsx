import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminTasks from './pages/admin/AdminTasks';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

// Member Pages
import MemberProjects from './pages/member/MemberProjects';

// Client Pages
import ClientMessages from './pages/client/ClientMessages';

// Placeholder components for unimplemented routes
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-96 text-slate-400">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>This feature is under development.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout allowedRoles={['admin']} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="tasks" element={<AdminTasks />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Member Routes */}
          <Route path="/member" element={<DashboardLayout allowedRoles={['member']} />}>
            <Route index element={<MemberProjects />} />
            <Route path="calendar" element={<Placeholder title="Team Calendar" />} />
            <Route path="files" element={<Placeholder title="File Repository" />} />
            <Route path="notifications" element={<Placeholder title="Notifications" />} />
          </Route>

          {/* Client Routes */}
          <Route path="/client" element={<DashboardLayout allowedRoles={['client']} />}>
            <Route index element={<Placeholder title="My Documents" />} />
            <Route path="messages" element={<ClientMessages />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
