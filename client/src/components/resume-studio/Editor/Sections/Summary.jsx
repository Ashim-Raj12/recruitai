import React, { useEffect } from 'react';
import { useResumeStore } from '../../../../store/resumeStore';
import { motion } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Sparkles } from 'lucide-react';
import { Button } from '../../../ui/Button';

export const Summary = () => {
  const { resumeData, updateSummary } = useResumeStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write a compelling professional summary that highlights your key achievements and skills...',
      }),
    ],
    content: resumeData.summary,
    onUpdate: ({ editor }) => {
      updateSummary(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert prose-p:my-1 focus:outline-none min-h-[200px] w-full p-4',
      },
    },
  });

  // Sync state if it changes externally (e.g., loading a new resume)
  useEffect(() => {
    if (editor && resumeData.summary !== editor.getHTML()) {
      editor.commands.setContent(resumeData.summary);
    }
  }, [resumeData.summary, editor]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Professional Summary</h2>
          <p className="text-muted-foreground text-sm">Write 2-4 sentences describing your background and goals.</p>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/10">
          <Sparkles size={16} className="mr-2" /> AI Improve
        </Button>
      </div>

      <div className="rounded-xl border border-border/60 bg-card overflow-hidden focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
        {/* Simple Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-muted/20">
          <button 
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-md hover:bg-muted ${editor?.isActive('bold') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          >
            <span className="font-bold">B</span>
          </button>
          <button 
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-md hover:bg-muted ${editor?.isActive('italic') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          >
            <span className="italic font-serif">I</span>
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button 
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-md hover:bg-muted ${editor?.isActive('bulletList') ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          >
            • List
          </button>
        </div>
        
        {/* Editor Area */}
        <div className="cursor-text" onClick={() => editor?.commands.focus()}>
          <EditorContent editor={editor} />
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="w-full sm:hidden border-primary/20 text-primary hover:bg-primary/10 mt-4">
        <Sparkles size={16} className="mr-2" /> AI Improve
      </Button>

    </motion.div>
  );
};
