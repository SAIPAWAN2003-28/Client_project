import React, { useState, useEffect, useRef } from 'react';
import { faker } from '@faker-js/faker';
import { Send, Phone, Video, MoreHorizontal, Paperclip, Check, CheckCheck } from 'lucide-react';

const ClientMessages = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const [contacts] = useState(() => Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    status: 'online',
    role: i === 0 ? 'Project Manager' : 'Team Member'
  })));

  const [conversations, setConversations] = useState(() => 
    contacts.map(contact => ({
      contactId: contact.id,
      messages: Array.from({ length: 4 }).map((_, i) => ({
        id: faker.string.uuid(),
        text: faker.lorem.sentence(),
        isMe: i % 2 === 0,
        time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      }))
    }))
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations, activeChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedConversations = [...conversations];
    updatedConversations[activeChat].messages.push(newMessage);
    setConversations(updatedConversations);
    setInputMessage('');

    // Simulate real-time reply
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        text: faker.hacker.phrase(),
        isMe: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      
      const conversationsWithReply = [...conversations];
      conversationsWithReply[activeChat].messages.push(replyMessage);
      
      // Update status of previous message to read
      const lastUserMsg = conversationsWithReply[activeChat].messages.find(m => m.id === newMessage.id);
      if (lastUserMsg) lastUserMsg.status = 'read';

      setConversations([...conversationsWithReply]);
    }, 2000 + Math.random() * 2000);
  };

  const currentMessages = conversations[activeChat].messages;
  const currentContact = contacts[activeChat];

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex">
      {/* Sidebar List */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="font-bold text-slate-800 text-lg">Messages</h2>
          <p className="text-xs text-slate-500">Real-time chat</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact, index) => {
            const lastMsg = conversations[index].messages[conversations[index].messages.length - 1];
            return (
              <div 
                key={contact.id}
                onClick={() => setActiveChat(index)}
                className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0 ${activeChat === index ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="relative">
                  <img src={contact.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-slate-800 truncate text-sm">{contact.name}</h4>
                    <span className="text-[10px] text-slate-400">{lastMsg?.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{lastMsg?.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-3">
            <img src={currentContact.avatar} alt="" className="w-10 h-10 rounded-full ring-2 ring-slate-100" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{currentContact.name}</h3>
              <p className="text-xs text-slate-500">{currentContact.role}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"><Phone size={18} /></button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"><Video size={18} /></button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"><MoreHorizontal size={18} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/subtle-light-aluminum.png')]">
          {currentMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[70%] group relative ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.isMe 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white text-slate-700 rounded-bl-sm border border-slate-100'
                }`}>
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                  {msg.isMe && (
                    <span className="text-blue-500">
                      {msg.status === 'read' ? <CheckCheck size={12} /> : <Check size={12} />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2 border border-slate-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <button type="button" className="text-slate-400 hover:text-slate-600 p-1">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 h-10"
            />
            <button 
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientMessages;
