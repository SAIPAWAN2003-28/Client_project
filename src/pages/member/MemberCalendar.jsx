import React, { useState } from 'react';
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, 
  isToday 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react';
import Modal from '../../components/ui/Modal';

const MemberCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  // Mock events
  const [events, setEvents] = useState([
    { id: 1, title: 'Project Review', date: new Date(), type: 'meeting', time: '10:00 AM' },
    { id: 2, title: 'Deadline: UI Design', date: new Date(new Date().setDate(new Date().getDate() + 2)), type: 'deadline', time: '5:00 PM' },
    { id: 3, title: 'Team Sync', date: new Date(new Date().setDate(new Date().getDate() - 3)), type: 'meeting', time: '09:30 AM' },
  ]);

  const [newEvent, setNewEvent] = useState({ title: '', time: '', type: 'meeting' });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayEvents = (day) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const event = {
      id: Date.now(),
      title: newEvent.title,
      time: newEvent.time,
      type: newEvent.type,
      date: selectedDate
    };
    setEvents([...events, event]);
    setIsEventModalOpen(false);
    setNewEvent({ title: '', time: '', type: 'meeting' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Team Calendar</h1>
          <p className="text-slate-500 mt-1">Schedule and track project milestones</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-md text-slate-600">
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 font-semibold text-slate-700 min-w-[140px] text-center">
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-md text-slate-600">
              <ChevronRight size={20} />
            </button>
          </div>
          <button 
            onClick={() => setIsEventModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 auto-rows-fr bg-slate-200 gap-px">
          {calendarDays.map((day, idx) => {
            const dayEvents = getDayEvents(day);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);

            return (
              <div 
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={`min-h-[120px] bg-white p-2 cursor-pointer transition-colors hover:bg-slate-50
                  ${!isCurrentMonth ? 'bg-slate-50/50 text-slate-400' : ''}
                  ${isSelected ? 'ring-2 ring-inset ring-blue-500 z-10' : ''}
                `}
              >
                <div className="flex justify-between items-start">
                  <span className={`
                    w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium
                    ${isToday(day) ? 'bg-blue-600 text-white' : 'text-slate-700'}
                  `}>
                    {format(day, 'd')}
                  </span>
                </div>
                
                <div className="mt-2 space-y-1">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id}
                      className={`text-xs p-1.5 rounded border truncate
                        ${event.type === 'deadline' 
                          ? 'bg-red-50 text-red-700 border-red-100' 
                          : 'bg-blue-50 text-blue-700 border-blue-100'
                        }
                      `}
                    >
                      <span className="font-semibold mr-1">{event.time}</span>
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title={`Add Event - ${format(selectedDate, 'MMM dd, yyyy')}`}>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              placeholder="e.g. Client Meeting"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
              <input 
                required
                type="time" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newEvent.type}
                onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
              >
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="reminder">Reminder</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsEventModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Save Event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MemberCalendar;
