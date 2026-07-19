import React from 'react';
import { useResumeStore } from '../../../../store/resumeStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SectionCard } from '../Shared/SectionCard';
import { Input } from '../../../ui/Forms';
import { Button } from '../../../ui/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Certifications = () => {
  const { resumeData, addItem, updateItem, deleteItem, reorderItems } = useResumeStore();
  const certs = resumeData.certifications || [];

  const handleAdd = () => {
    addItem('certifications', {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderItems('certifications', result.source.index, result.destination.index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Certifications</h2>
        <p className="text-muted-foreground text-sm">Add licenses, certifications, and professional training.</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="certifications-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {certs.map((cert, index) => (
                <Draggable key={cert.id} draggableId={cert.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <SectionCard
                        title={cert.name || 'New Certification'}
                        subtitle={`${cert.issuer ? cert.issuer + ' • ' : ''}${cert.date || ''}`}
                        isExpanded={certs.length === 1 || !cert.name}
                        onRemove={() => deleteItem('certifications', cert.id)}
                        dragHandleProps={provided.dragHandleProps}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input 
                            label="Certification Name" 
                            value={cert.name}
                            onChange={(e) => updateItem('certifications', cert.id, { name: e.target.value })}
                            placeholder="e.g. AWS Certified Solutions Architect"
                            className="sm:col-span-2"
                          />
                          <Input 
                            label="Issuing Organization" 
                            value={cert.issuer}
                            onChange={(e) => updateItem('certifications', cert.id, { issuer: e.target.value })}
                            placeholder="e.g. Amazon Web Services"
                          />
                          <Input 
                            label="Issue Date" 
                            type="month"
                            value={cert.date}
                            onChange={(e) => updateItem('certifications', cert.id, { date: e.target.value })}
                          />
                          <Input 
                            label="Credential URL" 
                            value={cert.url}
                            onChange={(e) => updateItem('certifications', cert.id, { url: e.target.value })}
                            placeholder="https://..."
                            className="sm:col-span-2"
                          />
                        </div>
                      </SectionCard>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button onClick={handleAdd} variant="outline" className="w-full border-dashed py-6 text-muted-foreground hover:text-foreground">
        <Plus size={18} className="mr-2" /> Add Certification
      </Button>

    </motion.div>
  );
};
