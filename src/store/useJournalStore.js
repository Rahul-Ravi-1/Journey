// /src/store/useJournalStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const uid = () => Math.random().toString(36).slice(2, 10);

export const useJournalStore = create(
  persist(
    (set, get) => ({
      // Journal entries by date
      entries: {},
      
      // Current date (for dev purposes)
      currentDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      
      // Add journal entry for current date
      addEntry: (content) => {
        const t = (content || "").trim();
        if (!t) return;
        
        set((state) => {
          const today = state.currentDate;
          const entry = {
            id: uid(),
            content: t,
            date: today,
            timestamp: new Date().toISOString(),
          };
          
          return {
            entries: {
              ...state.entries,
              [today]: entry, // Only one entry per day
            },
          };
        });
      },
      
      // Get entry for specific date
      getEntry: (date) => {
        return get().entries[date] || null;
      },
      
      // Get all entries (for consistency meter)
      getAllEntries: () => {
        return get().entries;
      },
      
      // Dev function: advance to next day
      advanceDay: () => {
        set((state) => {
          const current = new Date(state.currentDate);
          const next = new Date(current);
          next.setDate(current.getDate() + 1);
          
          return {
            currentDate: next.toISOString().split('T')[0],
          };
        });
      },
      
      // Dev function: go back to previous day
      goBackDay: () => {
        set((state) => {
          const current = new Date(state.currentDate);
          const prev = new Date(current);
          prev.setDate(current.getDate() - 1);
          
          return {
            currentDate: prev.toISOString().split('T')[0],
          };
        });
      },
      
      // Get consistency data for the last 365 days
      getConsistencyData: () => {
        const entries = get().entries;
        const data = [];
        
        // Generate last 365 days
        for (let i = 364; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          data.push({
            date: dateStr,
            hasEntry: !!entries[dateStr],
            entry: entries[dateStr] || null,
          });
        }
        
        return data;
      },
    }),
    {
      name: "journey-journal", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ 
        entries: s.entries,
        currentDate: s.currentDate 
      }), // persist entries and current date
    }
  )
);

