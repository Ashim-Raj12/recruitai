import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Avatar } from '../ui/Profile';

export const AvatarUpload = ({ value, onChange }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative group cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors bg-muted flex items-center justify-center">
          {preview || value ? (
            <img 
              src={preview || (typeof value === 'string' ? value : '')} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl text-muted-foreground font-semibold">
              U
            </span>
          )}
        </div>
        
        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera size={24} className="text-white" />
        </div>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/webp"
        className="hidden"
      />
      
      <p className="text-xs text-muted-foreground text-center">
        Allowed *.jpeg, *.png, *.webp<br/>
        max size of 2 MB
      </p>
    </div>
  );
};
