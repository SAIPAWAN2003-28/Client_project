import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Plus, Calendar, CheckCircle2, AlertCircle, Clock, MoreVertical, Search } from 'lucide-react';
import Modal from '../../components/ui/Modal';

const AdminTasks = () => {
  const [tasks, setTasks] = useState(() => 
    Array.from({ length: 6 }).map(() => ({
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      assignee: faker.person.fullName(),
      assigneeAvatar: faker.image.avatar(),
      dueDate: faker.date.future().toLocaleDateString(),
      priority: faker.helpers.arrayElement(['High', 'Medium', 'Low']),
      status: faker.helpers.arrayElement(['To Do', 'In Progress', 'Done']),
      project: faker.commerce.productName()
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    dueDate: '',
    priority: 'Medium',
    project: ''
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: faker.string.uuid(),
      ...newTask,
      assigneeAvatar: faker.image.avatar(),
      status: 'To Do'
    };
    setTasks([task, ...tasks]);
    setIsModalOpen(false);
    setNewTask({ title: '', assignee: '', dueDate: '', priority: 'Medium', project: '' });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Done': return <CheckCircle2 size={18} className="text-emerald-500" />;
      case 'In Progress': return <Clock size={18} className="text-blue-500" />;
      default: return <AlertCircle size={18} className="text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Task Management</h1>
          <p className="text-slate-500 mt-1">Assign and track team tasks</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
              <div className="pt-1">{getStatusIcon(task.status)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">{task.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} /> {task.project}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {task.dueDate}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 hidden md:flex">
                  <img src={task.assigneeAvatar} alt="" className="w-6 h-6 rounded-full" />
                  <span>{task.assignee}</span>
                </div>

                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Task">
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              placeholder="e.g. Update Homepage Design"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newTask.project}
              onChange={(e) => setNewTask({...newTask, project: e.target.value})}
              placeholder="e.g. Website Redesign"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
              <input 
                required
                type="text" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTask.assignee}
                onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
              <input 
                required
                type="date" 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <div className="flex gap-4">
              {['Low', 'Medium', 'High'].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="priority"
                    value={p}
                    checked={newTask.priority === p}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{p}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminTasks;
