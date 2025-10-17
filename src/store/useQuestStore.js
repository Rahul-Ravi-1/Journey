// /src/store/useQuestStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const uid = () => Math.random().toString(36).slice(2, 10);

export const useQuestStore = create(
  persist(
    (set, get) => ({
      quests: { main: [], side: [], misc: [] },

      addQuest: (category, text) => {
        const t = (text || "").trim();
        if (!t) return; // don't call set at all if invalid

        set((state) => {
          const list = state.quests[category] || [];
          const q = { id: uid(), text: t, completed: false };
          return {
            quests: {
              ...state.quests,
              [category]: [q, ...list],
            },
          };
        });
      },

      toggleQuest: (category, id) => {
        set((state) => {
          const list = state.quests[category] || [];
          return {
            quests: {
              ...state.quests,
              [category]: list.map((q) =>
                q.id === id ? { ...q, completed: !q.completed } : q
              ),
            },
          };
        });
      },

      removeQuest: (category, id) => {
        set((state) => {
          const list = state.quests[category] || [];
          return {
            quests: {
              ...state.quests,
              [category]: list.filter((q) => q.id !== id),
            },
          };
        });
      },

      clearCompleted: (category) => {
        set((state) => {
          const list = state.quests[category] || [];
          return {
            quests: {
              ...state.quests,
              [category]: list.filter((q) => !q.completed),
            },
          };
        });
      },
      clearAllQuests: () => {
        set(() => ({
          quests: { main: [], side: [], misc: [] },
        }));
      },
    }),
    {
      name: "journey-quests", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ quests: s.quests }), // persist only quests
    }
  )
);
