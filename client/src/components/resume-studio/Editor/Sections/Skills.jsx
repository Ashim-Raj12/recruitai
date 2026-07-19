import React from 'react';
import { useResumeStore } from '../../../../store/resumeStore';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Input } from '../../../ui/Forms';
import { Button } from '../../../ui/Button';
import { Plus, X, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Skills = () => {
  const { resumeData, addItem, deleteItem, reorderItems } = useResumeStore();
  const skills = resumeData.skills;
  const [newSkill, setNewSkill] = React.useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    addItem('skills', {
      id: Date.now().toString(),
      name: newSkill.trim(),
      category: 'Core', // default category
      level: 'Advanced'
    });
    setNewSkill('');
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderItems('skills', result.source.index, result.destination.index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Skills</h2>
        <p className="text-muted-foreground text-sm">Add technical and soft skills relevant to the role.</p>
      </div>

      {/* Add Skill Form */}
      <form onSubmit={handleAdd} className="flex gap-2 items-end">
        <div className="flex-1">
          <Input 
            label="Add Skill" 
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. React, Python, Project Management"
          />
        </div>
        <Button type="submit" className="mb-1 shrink-0">
          <Plus size={18} className="mr-2" /> Add
        </Button>
      </form>

      {/* Skills List (Draggable tags) */}
      <div className="bg-card border border-border/60 p-4 rounded-xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="skills-list" direction="vertical">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                className="flex flex-wrap gap-2"
              >
                <AnimatePresence>
                  {skills.map((skill, index) => (
                    <Draggable key={skill.id} draggableId={skill.id} index={index}>
                      {(provided, snapshot) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm font-medium ${
                            snapshot.isDragging 
                              ? 'bg-primary/20 border-primary text-primary shadow-lg z-50' 
                              : 'bg-muted/50 border-border/60 hover:bg-muted text-foreground'
                          }`}
                        >
                          <div 
                            {...provided.dragHandleProps}
                            className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing mr-1 -ml-1"
                          >
                            <GripVertical size={14} />
                          </div>
                          {skill.name}
                          <button 
                            type="button"
                            onClick={() => deleteItem('skills', skill.id)}
                            className="ml-1.5 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {skills.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No skills added yet.</p>
        )}
      </div>

    </motion.div>
  );
};
