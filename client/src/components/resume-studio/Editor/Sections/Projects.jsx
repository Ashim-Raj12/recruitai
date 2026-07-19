import React from 'react';
import { useResumeStore } from '../../../../store/resumeStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SectionCard } from '../Shared/SectionCard';
import { Input, Textarea } from '../../../ui/Forms';
import { Button } from '../../../ui/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Projects = () => {
  const { resumeData, addItem, updateItem, deleteItem, reorderItems } = useResumeStore();
  const projects = resumeData.projects;

  const handleAdd = () => {
    addItem('projects', {
      id: Date.now().toString(),
      name: '',
      description: '',
      techStack: '',
      github: '',
      url: '',
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderItems('projects', result.source.index, result.destination.index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Projects</h2>
        <p className="text-muted-foreground text-sm">Add impactful projects that demonstrate your skills.</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {projects.map((proj, index) => (
                <Draggable key={proj.id} draggableId={proj.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <SectionCard
                        title={proj.name || 'New Project'}
                        subtitle={proj.techStack || 'Tech stack not specified'}
                        isExpanded={projects.length === 1 || !proj.name}
                        onRemove={() => deleteItem('projects', proj.id)}
                        dragHandleProps={provided.dragHandleProps}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input 
                            label="Project Name" 
                            value={proj.name}
                            onChange={(e) => updateItem('projects', proj.id, { name: e.target.value })}
                            placeholder="e.g. RecruitAI"
                            className="sm:col-span-2"
                          />
                          <Input 
                            label="Tech Stack" 
                            value={proj.techStack}
                            onChange={(e) => updateItem('projects', proj.id, { techStack: e.target.value })}
                            placeholder="e.g. React, Node.js, MongoDB"
                            className="sm:col-span-2"
                          />
                          <Input 
                            label="GitHub Link" 
                            value={proj.github}
                            onChange={(e) => updateItem('projects', proj.id, { github: e.target.value })}
                            placeholder="github.com/..."
                          />
                          <Input 
                            label="Live URL" 
                            value={proj.url}
                            onChange={(e) => updateItem('projects', proj.id, { url: e.target.value })}
                            placeholder="https://..."
                          />
                          <Textarea 
                            label="Description (Bullet points)" 
                            value={proj.description}
                            onChange={(e) => updateItem('projects', proj.id, { description: e.target.value })}
                            placeholder="• Built a scalable...&#10;• Reduced latency by..."
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
        <Plus size={18} className="mr-2" /> Add Project
      </Button>

    </motion.div>
  );
};
