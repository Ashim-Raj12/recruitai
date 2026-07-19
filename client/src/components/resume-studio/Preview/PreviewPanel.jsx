import React, { useRef, useEffect, useState } from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import { ResumeDocument } from './ResumeDocument';
import { ZoomIn, ZoomOut, Maximize, FileDown } from 'lucide-react';
import { Button } from '../../ui/Button';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const PreviewPanel = () => {
  const { resumeData, ui, setUI } = useResumeStore();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Auto-scale to fit container on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      
      // A4 aspect ratio (210 x 297) -> width: 800px, height: 1131px
      const a4Width = 800;
      
      // Padding of 80px on sides
      const availableWidth = containerWidth - 80;
      
      // Base scale to fit width
      let newScale = availableWidth / a4Width;
      
      // If zooming manually, we override this logic. But for auto-fit:
      if (ui.zoom === 100) {
        // cap scale at 1
        newScale = Math.min(newScale, 1);
        setScale(newScale);
      } else {
        setScale(ui.zoom / 100);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ui.zoom]);

  const handleZoomIn = () => setUI({ zoom: Math.min(ui.zoom + 10, 200) });
  const handleZoomOut = () => setUI({ zoom: Math.max(ui.zoom - 10, 50) });
  const resetZoom = () => setUI({ zoom: 100 });

  const handleDownload = () => {
    toast.success('High-quality PDF Export will be available once backend is connected! Using browser print for now.', { duration: 4000 });
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-muted/30">
      {/* Preview Toolbar */}
      <div className="h-14 border-b border-border/50 bg-card/80 backdrop-blur flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleZoomOut}><ZoomOut size={16} /></Button>
          <span className="text-xs font-medium w-12 text-center">{Math.round(scale * 100)}%</span>
          <Button variant="ghost" size="icon" onClick={handleZoomIn}><ZoomIn size={16} /></Button>
          <Button variant="ghost" size="icon" onClick={resetZoom}><Maximize size={16} /></Button>
        </div>
        
        <Button onClick={handleDownload} size="sm" variant="outline" className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/10">
          <FileDown size={16} className="mr-2" /> Download PDF
        </Button>
      </div>

      {/* Scrollable Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto flex justify-center py-10"
      >
        {/* Wrapper to enforce actual layout dimensions based on scale */}
        <div 
          style={{ 
            width: `${800 * scale}px`, 
            height: `${1131 * scale}px`,
            position: 'relative'
          }}
        >
          <motion.div 
            layout
            className="bg-white shadow-2xl absolute top-0 left-0 print:shadow-none print:m-0 print:p-0"
            style={{ 
              width: '800px', 
              height: '1131px', // Explicit A4 aspect ratio height at 800px width
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <ResumeDocument data={resumeData} template={ui.template} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
