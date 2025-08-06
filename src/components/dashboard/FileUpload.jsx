import React, { useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFiles(Array.from(e.target.files));
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => ['application/pdf', 'text/csv', 'application/vnd.ms-excel'].includes(file.type));
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => setUploadedFiles(prev => prev.filter((_, i) => i !== index));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Expense Data</h3>
      <div className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
        <input type="file" id="file-upload" multiple accept=".pdf,.csv,.xlsx,.xls" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Upload className="h-6 w-6 text-blue-600" /></div>
          <div>
            <p className="text-lg font-medium text-gray-900">Drop your files here, or <span className="text-blue-600">browse</span></p>
            <p className="text-sm text-gray-500 mt-1">Supports PDF, CSV, and Excel files up to 10MB</p>
          </div>
        </div>
      </div>
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm"><File className="h-4 w-4 text-gray-500" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <button onClick={() => removeFile(index)} className="p-1 hover:bg-gray-200 rounded transition-colors"><X className="h-4 w-4 text-gray-400" /></button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">Process Files</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;