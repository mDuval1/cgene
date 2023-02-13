import { create } from 'zustand';

interface SelectionStore {
  cursorPosition: number | null;
  hoveredCursorPosition: number | null;
  selectionEnd: number | null;
  selectionStart: number | null;
  setCursorPosition: (cursorPosition: number | null) => void;
  setHoveredCursorPosition: (cursorPosition: number | null) => void;
}

const useSelectionStore = create<SelectionStore>((set) => ({
  cursorPosition: null,
  hoveredCursorPosition: null,
  selectionEnd: null,
  selectionStart: null,
  setCursorPosition: (newPosition: number | null) => {
    set({ cursorPosition: newPosition, selectionStart: newPosition });
  },
  setHoveredCursorPosition: (hoveredCursorPosition: number | null) => {
    set({ hoveredCursorPosition });
  },
}));

export default useSelectionStore;
