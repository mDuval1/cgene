import { type VirtualElement } from '@popperjs/core';
import { create } from 'zustand';

interface SelectionStore {
  cursorPosition: number | null;
  hoveredCursorPosition: number | null;
  isSelectingRegion: boolean;
  rightClickReference: null | VirtualElement;
  selectionEnd: number | null;
  selectionStart: number | null;
  setHoveredCursorPosition: (cursorPosition: number | null) => void;
  setRightClickReference: (rightClickReference: null | VirtualElement) => void;
  setSelectionEnd: (cursorPosition: number | null) => void;
  setSelectionStart: (cursorPosition: number | null) => void;
}

const useSelectionStore = create<SelectionStore>((set) => ({
  cursorPosition: null,
  hoveredCursorPosition: null,
  isSelectingRegion: false,
  rightClickReference: null,
  selectionEnd: null,
  selectionStart: null,
  setHoveredCursorPosition: (hoveredCursorPosition: number | null) => {
    set((previousState) => {
      if (previousState.isSelectingRegion) {
        return { hoveredCursorPosition, selectionEnd: hoveredCursorPosition };
      }
      return { hoveredCursorPosition };
    });
  },
  setRightClickReference: (reference) => {
    set({ rightClickReference: reference });
  },
  setSelectionEnd: (position: number | null) => {
    set({
      cursorPosition: position,
      isSelectingRegion: false,
      rightClickReference: null,
      selectionEnd: position,
    });
  },
  setSelectionStart: (position: number | null) => {
    set({ isSelectingRegion: true, selectionStart: position });
  },
}));

export const useGetSelection = (): {
  end: number | null;
  isValid: boolean;
  start: number | null;
} => {
  const { selectionEnd, selectionStart } = useSelectionStore();
  const isValidSelection =
    selectionStart != null && selectionEnd != null && selectionStart !== selectionEnd;
  if (!isValidSelection) {
    return { end: selectionEnd, isValid: false, start: selectionStart };
  }
  if (selectionStart < selectionEnd) {
    return { end: selectionEnd, isValid: true, start: selectionStart };
  }

  return { end: selectionStart, isValid: true, start: selectionEnd };
};

export default useSelectionStore;
