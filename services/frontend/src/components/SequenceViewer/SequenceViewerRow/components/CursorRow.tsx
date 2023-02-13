import { useCallback, useMemo } from 'react';

import useSelectionStore from '../../../../stores/selectionStore';

interface CursorRowProps {
  getPixelCursorLeftFromNumber: (position: number) => number | null;
}

function CursorRow({ getPixelCursorLeftFromNumber }: CursorRowProps) {
  const { cursorPosition, hoveredCursorPosition } = useSelectionStore();

  const getPixelCursorLeft = useCallback(
    (position: number | null) => {
      if (position == null) return null;
      return getPixelCursorLeftFromNumber(position);
    },
    [getPixelCursorLeftFromNumber],
  );
  const pixelCursorPosition = useMemo(
    () => getPixelCursorLeft(cursorPosition),
    [cursorPosition, getPixelCursorLeft],
  );

  const pixelHoveredCursorPosition = useMemo(
    () => getPixelCursorLeft(hoveredCursorPosition),
    [hoveredCursorPosition, getPixelCursorLeft],
  );

  return (
    <>
      {pixelCursorPosition != null && (
        <div
          className="absolute  top-0 h-full w-0.5 bg-slate-800"
          style={{ left: pixelCursorPosition }}
        />
      )}
      {pixelHoveredCursorPosition != null && (
        <div
          className="absolute  top-0 h-6 w-0.5 bg-slate-600"
          style={{ left: pixelHoveredCursorPosition }}
        />
      )}
    </>
  );
}

export default CursorRow;
