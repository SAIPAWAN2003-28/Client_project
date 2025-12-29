import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Folder, File, MoreVertical, Download, Share2, Trash2 } from 'lucide-react';
import FileUploader from '../../components/ui/FileUploader';
import Modal from '../../components/ui/Modal';

const MemberFiles = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const [folders] = useState([
    { id: 1, name: 'Project Assets', count: 12 },
    { id: 2, name: 'Design Specs', count: 5 },
    { id: 3, name: 'Legal Documents', count: 3 },
    { id: 4, name: 'Marketing Materials', count: 8 },
  ]);

  const [files, setFiles] = useState(() => 
    Array.from({ length: 8 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.system.fileName(),
      type: faker.system.fileExt(),
      size: faker.number.int({ min: 100, max: 10000 }) + ' KB',
      modified: faker.date.recent().toLocaleDateString(),
      owner: faker.person.fullName()
    }))
  );

  const handleUpload = (newFiles) => {
    const newDocs = newFiles.map(file => ({
      id: faker.string.uuid(),
      name: file.name,
      type: file.name.split('.').pop(),
      size: (file.size / 1024).toFixed(0) + ' KB',
      modified: new Date().toLocaleDateString(),
      owner: 'Me'
    }));
    
    setTimeout(() => {
      setFiles(prev => [...newDocs, ...prev]);
      setIsUploadModalOpen(false);
    }, 800);
  };

  const handleDelete = (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(f => f.id !== fileId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">File Repository</h1>
          <p className="text-slate-500 mt-1">Centralized storage for team resources</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Upload Files
        </button>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map(folder => (
          <div key={folder.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <Folder className="text-blue-500 fill-blue-100" size={32} />
              <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={18} />
              </button>
            </div>
            <h3 className="font-semibold text-slate-800 truncate">{folder.name}</h3>
            <p className="text-xs text-slate-500">{folder.count} files</p>
          </div>
        ))}
      </div>

      {/* Recent Files */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800">Recent Files</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Modified</th>
                <th className="px-6 py-3">Size</th>
                <th className="px-6 py-3">Owner</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <File size={18} className="text-slate-400" />
                      <span className="font-medium text-slate-700">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-500">{file.modified}</td>
                  <td className="px-6 py-3 text-sm text-slate-500">{file.size}</td>
                  <td className="px-6 py-3 text-sm text-slate-500">{file.owner}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md" title="Share">
                        <Share2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(file.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md" 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload to Repository">
        <div className="space-y-6">
          <FileUploader onUpload={handleUpload} />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MemberFiles;
