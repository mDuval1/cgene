import useSelectionStore from '../stores/selectionStore';

function SelectionBottomBar() {
  const { cursorPosition } = useSelectionStore();

  const cursorPositionMessage = cursorPosition != null ? `Cursor is at ${cursorPosition}` : '';

  return <span>{cursorPositionMessage}</span>;
}

export default SelectionBottomBar;
