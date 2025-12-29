import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Bell, Check, Clock, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

const MemberNotifications = () => {
  const [notifications, setNotifications] = useState(() => 
    Array.from({ length: 8 }).map(() => ({
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.lorem.sentence(),
      time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: faker.date.recent().toLocaleDateString(),
      type: faker.helpers.arrayElement(['info', 'success', 'warning']),
      isRead: faker.datatype.boolean()
    }))
  );

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'warning': return <AlertCircle className="text-amber-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with project activities</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Check size={16} />
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 hover:bg-slate-50 transition-colors flex gap-4 ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="mt-1 flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className={`text-sm font-semibold ${!notification.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2 flex items-center gap-1">
                    <Clock size={12} />
                    {notification.date} • {notification.time}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{notification.description}</p>
              </div>
              {!notification.isRead && (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <Bell size={48} className="mx-auto text-slate-300 mb-4" />
              <p>No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberNotifications;
