import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Send, Phone, Video, MoreHorizontal, Paperclip } from 'lucide-react';

const ClientMessages = () => {
  const [activeChat, setActiveChat] = useState(0);

  const contacts = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    lastMessage: faker.lorem.sentence(),
    time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    unread: i === 0 ? 2 : 0,
  }));

  const messages = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    text: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
    isMe: i % 2 === 0,
    time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }));

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex">
      {/* Sidebar List */}
      <div className="w-80 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-800">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact, index) => (
            <div 
              key={contact.id}
              onClick={() => setActiveChat(index)}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${activeChat === index ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
            >
              <div className="relative">
                <img src={contact.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-slate-800 truncate">{contact.name}</h4>
                  <span className="text-xs text-slate-400">{contact.time}</span>
                </div>
                <p className="text-sm text-slate-500 truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="flex flex-col justify-center">
                  <span className="w-5 h-5 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full">
                    {contact.unread}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Header */}
        <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={contacts[activeChat].avatar} alt="" className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-bold text-slate-800">{contacts[activeChat].name}</h3>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> Online
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-slate-400">
            <button className="hover:text-blue-600"><Phone size={20} /></button>
            <button className="hover:text-blue-600"><Video size={20} /></button>
            <button className="hover:text-blue-600"><MoreHorizontal size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 shadow-sm rounded-bl-none'}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-blue-200' : 'text-slate-400'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
            <button className="text-slate-400 hover:text-slate-600">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-700"
            />
            <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMessages;
