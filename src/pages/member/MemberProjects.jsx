import React from 'react';
import { faker } from '@faker-js/faker';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const MemberProjects = () => {
  const projects = Array.from({ length: 6 }).map(() => ({
    id: faker.string.uuid(),
    title: faker.company.catchPhrase(),
    client: faker.company.name(),
    deadline: faker.date.future().toLocaleDateString(),
    progress: faker.number.int({ min: 10, max: 100 }),
    status: faker.helpers.arrayElement(['In Progress', 'Review', 'Completed']),
    members: Array.from({ length: 3 }).map(() => faker.image.avatar()),
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Review': return 'bg-amber-100 text-amber-700';
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Projects</h1>
          <p className="text-slate-500 mt-1">Track your active assignments and deadlines</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <button className="text-slate-400 hover:text-indigo-600">
                <Clock size={18} />
              </button>
            </div>

            <h3 className="font-bold text-slate-800 text-lg mb-1 line-clamp-1">{project.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{project.client}</p>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <div className="flex -space-x-2">
                {project.members.map((avatar, i) => (
                  <img key={i} src={avatar} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                ))}
              </div>
              <div className="flex items-center text-xs text-slate-500">
                <Calendar size={14} className="mr-1" />
                {project.deadline}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberProjects;
