import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, FileText, Settings, 
  Calendar, MessageSquare, Folder, PieChart, 
  LogOut, Bell, Briefcase
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getNavItems = (role) => {
    switch (role) {
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
          { icon: Users, label: 'Manage Users', path: '/admin/users' },
          { icon: Briefcase, label: 'Tasks', path: '/admin/tasks' },
          { icon: PieChart, label: 'Reports', path: '/admin/reports' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' },
        ];
      case 'member':
        return [
          { icon: Briefcase, label: 'My Projects', path: '/member' },
          { icon: Calendar, label: 'Calendar', path: '/member/calendar' },
          { icon: Folder, label: 'Files', path: '/member/files' },
          { icon: Bell, label: 'Notifications', path: '/member/notifications' },
        ];
      case 'client':
        return [
          { icon: FileText, label: 'Documents', path: '/client' },
          { icon: MessageSquare, label: 'Messages', path: '/client/messages' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems(user?.role);

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Nexus Platform
        </h1>
        <p className="text-xs text-slate-400 mt-1 capitalize">{user?.role} Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin' || item.path === '/member' || item.path === '/client'}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )
            }
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <img src={user?.avatar} alt="Profile" className="w-8 h-8 rounded-full ring-2 ring-slate-700" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
