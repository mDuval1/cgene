import useSelectionStore, { useGetSelection } from '../../stores/selectionStore';

function SelectionBottomBar() {
  const { cursorPosition, hoveredCursorPosition } = useSelectionStore();
  const { start, end } = useGetSelection();

  const cursorPositionMessage = cursorPosition != null ? `Cursor is at ${cursorPosition}` : '';
  const hoveredPositionMessage =
    hoveredCursorPosition != null ? `Mouse is at ${hoveredCursorPosition}` : '';
  const selectionMessage =
    start != null && end != null && start !== end
      ? `Selecting bases between ${start} and ${end}`
      : '';

  return (
    <div className="flex ">
      <span className="px-4">{cursorPositionMessage}</span>
      <span className="px-4">{hoveredPositionMessage}</span>
      <span className="px-4">{selectionMessage}</span>
    </div>
  );
}

export default SelectionBottomBar;
