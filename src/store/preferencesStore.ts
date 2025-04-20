import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences } from './types';

interface PreferencesState extends UserPreferences {
  // Actions
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setFontSize: (fontSize: number) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'dark',
      sidebarCollapsed: false,
      fontSize: 16,
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
      
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed 
      })),
      
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: 'user-preferences',
    }
  )
); 