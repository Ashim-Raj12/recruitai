import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialResumeData = {
  id: null,
  title: 'Untitled Resume',
  personalInfo: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  experience: [], // { id, company, position, location, type, startDate, endDate, current, description }
  education: [], // { id, institution, degree, field, cgpa, startDate, endDate, description }
  projects: [], // { id, name, description, techStack, github, url }
  skills: [], // { id, name, category, level }
  certifications: [], // { id, name, issuer, date, url }
};

export const useResumeStore = create(
  persist(
    (set, get) => ({
      // --- DATA SLICE ---
      resumeData: initialResumeData,
      setResumeData: (data) => set({ resumeData: { ...get().resumeData, ...data } }),
      
      updatePersonalInfo: (field, value) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          personalInfo: { ...state.resumeData.personalInfo, [field]: value }
        }
      })),

      updateSummary: (summary) => set((state) => ({
        resumeData: { ...state.resumeData, summary }
      })),

      // Generic array handlers (for Experience, Education, Projects, etc.)
      addItem: (section, item) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          [section]: [...state.resumeData[section], item]
        }
      })),

      updateItem: (section, id, data) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          [section]: state.resumeData[section].map(item => item.id === id ? { ...item, ...data } : item)
        }
      })),

      deleteItem: (section, id) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          [section]: state.resumeData[section].filter(item => item.id !== id)
        }
      })),

      reorderItems: (section, startIndex, endIndex) => set((state) => {
        const result = Array.from(state.resumeData[section]);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return {
          resumeData: {
            ...state.resumeData,
            [section]: result
          }
        };
      }),

      // --- UI SLICE ---
      ui: {
        activeSection: 'personal', // personal, summary, experience, education, etc.
        template: 'modern', // modern, minimal, executive
        zoom: 100, // percentage
        printMode: false,
      },
      setUI: (uiState) => set((state) => ({ ui: { ...state.ui, ...uiState } })),
      setActiveSection: (section) => set((state) => ({ ui: { ...state.ui, activeSection: section } })),
      setTemplate: (template) => set((state) => ({ ui: { ...state.ui, template } })),

      // --- UTILS ---
      resetResume: () => set({ resumeData: initialResumeData }),
    }),
    {
      name: 'resume-storage', // saves to local storage so users don't lose data on refresh
    }
  )
);
