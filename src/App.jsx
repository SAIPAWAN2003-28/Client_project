import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminTasks from './pages/admin/AdminTasks';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';

// Member Pages
import MemberProjects from './pages/member/MemberProjects';
import MemberCalendar from './pages/member/MemberCalendar';
import MemberFiles from './pages/member/MemberFiles';
import MemberNotifications from './pages/member/MemberNotifications';

// Client Pages
import ClientMessages from './pages/client/ClientMessages';
import ClientDocuments from './pages/client/ClientDocuments';
import ClientProfile from './pages/client/ClientProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
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
            <Route path="calendar" element={<MemberCalendar />} />
            <Route path="files" element={<MemberFiles />} />
            <Route path="notifications" element={<MemberNotifications />} />
          </Route>

          {/* Client Routes */}
          <Route path="/client" element={<DashboardLayout allowedRoles={['client']} />}>
            <Route index element={<ClientDocuments />} />
            <Route path="messages" element={<ClientMessages />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
