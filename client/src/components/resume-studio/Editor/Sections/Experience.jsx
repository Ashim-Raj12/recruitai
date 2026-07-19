import React from 'react';
import { useResumeStore } from '../../../../store/resumeStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SectionCard } from '../Shared/SectionCard';
import { Input, Textarea } from '../../../ui/Forms';
import { Button } from '../../../ui/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Experience = () => {
  const { resumeData, addItem, updateItem, deleteItem, reorderItems } = useResumeStore();
  const experiences = resumeData.experience;

  const handleAdd = () => {
    addItem('experience', {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      type: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderItems('experience', result.source.index, result.destination.index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Work Experience</h2>
          <p className="text-muted-foreground text-sm">Add your relevant experience in reverse chronological order.</p>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experience-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {experiences.map((exp, index) => (
                <Draggable key={exp.id} draggableId={exp.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <SectionCard
                        title={exp.position || exp.company || 'New Experience'}
                        subtitle={`${exp.company ? exp.company + ' • ' : ''}${exp.startDate} - ${exp.endDate || 'Present'}`}
                        isExpanded={experiences.length === 1 || !exp.company}
                        onRemove={() => deleteItem('experience', exp.id)}
                        dragHandleProps={provided.dragHandleProps}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input 
                            label="Job Title" 
                            value={exp.position}
                            onChange={(e) => updateItem('experience', exp.id, { position: e.target.value })}
                            placeholder="e.g. Software Engineer"
                          />
                          <Input 
                            label="Company" 
                            value={exp.company}
                            onChange={(e) => updateItem('experience', exp.id, { company: e.target.value })}
                            placeholder="e.g. Google"
                          />
                          <Input 
                            label="Start Date" 
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateItem('experience', exp.id, { startDate: e.target.value })}
                          />
                          <Input 
                            label="End Date" 
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateItem('experience', exp.id, { endDate: e.target.value })}
                          />
                          <Input 
                            label="Location" 
                            value={exp.location}
                            onChange={(e) => updateItem('experience', exp.id, { location: e.target.value })}
                            placeholder="e.g. Remote"
                            className="sm:col-span-2"
                          />
                          <Textarea 
                            label="Description (Bullet points)" 
                            value={exp.description}
                            onChange={(e) => updateItem('experience', exp.id, { description: e.target.value })}
                            placeholder="• Developed new features...&#10;• Improved performance by..."
                            className="sm:col-span-2 min-h-[120px]"
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
        <Plus size={18} className="mr-2" /> Add Experience
      </Button>

    </motion.div>
  );
};
