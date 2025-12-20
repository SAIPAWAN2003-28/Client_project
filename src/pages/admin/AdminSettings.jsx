import React, { useState } from 'react';
import { Save, Bell, Lock, Globe, Mail, Shield } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
          <p className="text-slate-500 mt-1">Manage platform configurations</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-white/50 hover:text-slate-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">General Information</h3>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                  <input type="text" defaultValue="Nexus Platform" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="email" defaultValue="support@nexus.com" className="w-full pl-10 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option>UTC (GMT+00:00)</option>
                      <option>EST (GMT-05:00)</option>
                      <option>PST (GMT-08:00)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Maintenance Mode</label>
                  <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-slate-50">
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-slate-300">
                      <input type="checkbox" className="absolute w-6 h-6 bg-white rounded-full border border-slate-300 appearance-none cursor-pointer peer checked:translate-x-6 checked:border-blue-600" />
                    </div>
                    <span className="text-sm text-slate-600">Enable maintenance mode (only admins can login)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Notification Preferences</h3>
               <div className="space-y-4">
                 {['Email Alerts for New Users', 'Weekly Report Summary', 'System Error Alerts', 'Task Deadline Reminders'].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                     <span className="text-sm font-medium text-slate-700">{item}</span>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" defaultChecked className="sr-only peer" />
                       <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                     </label>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg flex gap-3">
                  <Shield className="text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm">Two-Factor Authentication</h4>
                    <p className="text-blue-700 text-xs mt-1">Enforce 2FA for all admin accounts.</p>
                  </div>
                  <button className="ml-auto text-sm font-medium text-blue-600 hover:underline">Enable</button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password Policy</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Strong (Min 8 chars, symbols required)</option>
                    <option>Medium (Min 8 chars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Session Timeout</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>4 Hours</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
