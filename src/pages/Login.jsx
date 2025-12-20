import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, Briefcase } from 'lucide-react';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      const paths = {
        admin: '/admin',
        member: '/member',
        client: '/client'
      };
      navigate(paths[user.role]);
    }
  }, [user, navigate]);

  const handleLogin = (role) => {
    login(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Branding */}
        <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Nexus Platform</h1>
            <p className="text-blue-100 text-lg mb-8">
              Seamlessly connect Admins, Teams, and Clients in one unified workspace.
            </p>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/50"></div>
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <div className="w-3 h-3 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Options */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8">Select a role to simulate login:</p>

          <div className="space-y-4">
            <button
              onClick={() => handleLogin('admin')}
              className="w-full group flex items-center p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield size={24} />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-slate-800">Admin Portal</h3>
                <p className="text-sm text-slate-500">Manage users, settings & analytics</p>
              </div>
            </button>

            <button
              onClick={() => handleLogin('member')}
              className="w-full group flex items-center p-4 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 text-left"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-slate-800">Team Member</h3>
                <p className="text-sm text-slate-500">Access projects, tasks & calendar</p>
              </div>
            </button>

            <button
              onClick={() => handleLogin('client')}
              className="w-full group flex items-center p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 text-left"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-slate-800">Client Portal</h3>
                <p className="text-sm text-slate-500">View documents & chat with team</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
