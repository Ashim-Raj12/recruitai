import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';

export const FileUploadArea = ({ file, onFileSelect, onFileRemove, accept = ".pdf", maxSizeMB = 5 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const validateAndSetFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be less than ${maxSizeMB}MB.`);
      return;
    }
    onFileSelect(selectedFile);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, [maxSizeMB, onFileSelect]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  if (file) {
    return (
      <div className="w-full p-4 bg-muted/20 border border-primary/30 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
            <File size={20} className="text-primary" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-medium truncate">{file.name}</span>
            <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        </div>
        <button 
          onClick={onFileRemove}
          className="p-2 hover:bg-muted rounded-full transition-colors shrink-0"
        >
          <X size={18} className="text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`w-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-colors cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/10'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <UploadCloud size={24} className="text-muted-foreground" />
        </div>
        <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
        <p className="text-xs text-muted-foreground">PDF only (max. {maxSizeMB}MB)</p>
        <input 
          id="file-upload" 
          type="file" 
          accept={accept}
          className="hidden" 
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
    </div>
  );
};
