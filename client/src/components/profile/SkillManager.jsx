import React, { useState } from 'react';
import { useProfileStore } from '../../store/profileStore';
import { Loader2, Plus, Save, X } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const SKILL_CATEGORIES = [
  'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Programming', 'AI/ML', 'Tools', 'Soft Skills', 'Languages'
];

const SkillManager = ({ profile }) => {
  const { updateProfile, isLoading } = useProfileStore();
  const [skills, setSkills] = useState(profile?.skills || []);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;

    // Check if skill already exists
    if (skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      setNewSkillName('');
      return;
    }

    setSkills([...skills, { name: newSkillName.trim(), category: newSkillCategory }]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill.name !== skillToRemove.name));
  };

  const handleSave = async () => {
    const res = await updateProfile({ skills });
    if (res.success) {
      toast.success('Skills updated successfully');
    } else {
      toast.error(res.error || 'Failed to update Skills');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Group skills by category for display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Skills Manager</h3>
        <p className="text-white/50 text-sm mb-6">Add your skills to improve AI job matching.</p>
      </div>

      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-border/50">
        <h4 className="text-sm font-medium text-white/70 mb-4">Add a new skill</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React, Python, Project Management"
            className="flex-1 bg-zinc-900 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value)}
            className="w-full sm:w-48 bg-zinc-900 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          >
            {SKILL_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <Button type="button" onClick={handleAddSkill} className="shrink-0 flex items-center gap-2">
            <Plus size={16} /> Add
          </Button>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map(skill => (
                <div 
                  key={skill.name} 
                  className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium"
                >
                  {skill.name}
                  <button 
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-12 text-white/30 text-sm">
            No skills added yet. Start adding skills above!
          </div>
        )}
      </div>

      <div className="pt-4 mt-8 border-t border-border/50 flex justify-end">
        <Button 
          type="button" 
          onClick={handleSave}
          disabled={isLoading} 
          className="flex items-center gap-2"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Skills
        </Button>
      </div>
    </div>
  );
};

export default SkillManager;
