import React from 'react';
import { useResumeStore } from '../../../../store/resumeStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SectionCard } from '../Shared/SectionCard';
import { Input, Textarea } from '../../../ui/Forms';
import { Button } from '../../../ui/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Education = () => {
  const { resumeData, addItem, updateItem, deleteItem, reorderItems } = useResumeStore();
  const education = resumeData.education;

  const handleAdd = () => {
    addItem('education', {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      cgpa: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderItems('education', result.source.index, result.destination.index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Education</h2>
        <p className="text-muted-foreground text-sm">Add your degrees and educational background.</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="education-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {education.map((edu, index) => (
                <Draggable key={edu.id} draggableId={edu.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <SectionCard
                        title={edu.institution || 'New Education'}
                        subtitle={`${edu.degree ? edu.degree + ' • ' : ''}${edu.startDate} - ${edu.endDate || 'Present'}`}
                        isExpanded={education.length === 1 || !edu.institution}
                        onRemove={() => deleteItem('education', edu.id)}
                        dragHandleProps={provided.dragHandleProps}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input 
                            label="Institution" 
                            value={edu.institution}
                            onChange={(e) => updateItem('education', edu.id, { institution: e.target.value })}
                            placeholder="e.g. Stanford University"
                          />
                          <Input 
                            label="Degree" 
                            value={edu.degree}
                            onChange={(e) => updateItem('education', edu.id, { degree: e.target.value })}
                            placeholder="e.g. Bachelor of Science"
                          />
                          <Input 
                            label="Field of Study" 
                            value={edu.field}
                            onChange={(e) => updateItem('education', edu.id, { field: e.target.value })}
                            placeholder="e.g. Computer Science"
                          />
                          <Input 
                            label="CGPA / Grade" 
                            value={edu.cgpa}
                            onChange={(e) => updateItem('education', edu.id, { cgpa: e.target.value })}
                            placeholder="e.g. 3.8/4.0"
                          />
                          <Input 
                            label="Start Date" 
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateItem('education', edu.id, { startDate: e.target.value })}
                          />
                          <Input 
                            label="End Date" 
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateItem('education', edu.id, { endDate: e.target.value })}
                          />
                          <Textarea 
                            label="Description / Coursework" 
                            value={edu.description}
                            onChange={(e) => updateItem('education', edu.id, { description: e.target.value })}
                            placeholder="Relevant coursework, honors, etc."
                            className="sm:col-span-2 min-h-[100px]"
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
        <Plus size={18} className="mr-2" /> Add Education
      </Button>

    </motion.div>
  );
};
