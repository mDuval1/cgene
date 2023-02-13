import { useCallback, useMemo } from 'react';

import { useGetSelection } from '../../../../stores/selectionStore';

interface SelectionRowProps {
  characterIndexEnd: number;
  characterIndexStart: number;
  getPixelCursorLeftFromNumber: (position: number) => number | null;
}

function SelectionRow({
  getPixelCursorLeftFromNumber,
  characterIndexStart,
  characterIndexEnd,
}: SelectionRowProps) {
  const { start, end, isValid: isSelectionValid } = useGetSelection();

  const selectionZone = useMemo(() => {
    if (start == null || start > characterIndexEnd) return null;
    if (end == null || end < characterIndexStart - 1) return null;
    return [Math.max(characterIndexStart - 1, start), Math.min(characterIndexEnd, end)];
  }, [characterIndexEnd, characterIndexStart, end, start]);

  const maskZones = useMemo(() => {
    if (!isSelectionValid) return [];
    if (!selectionZone) return [[characterIndexStart - 1, characterIndexEnd]];
    const [selectionStart, selectionEnd] = selectionZone;
    const zones: number[][] = [];
    if (characterIndexStart - 1 < selectionStart) {
      zones.push([characterIndexStart - 1, selectionStart]);
    }
    if (selectionEnd < characterIndexEnd) {
      zones.push([selectionEnd, characterIndexEnd]);
    }
    return zones;
  }, [characterIndexEnd, characterIndexStart, isSelectionValid, selectionZone]);

  const getStyleForZone = useCallback(
    (zone: number[]) => {
      const [leftStart, leftEnd] = zone.map(getPixelCursorLeftFromNumber);
      if (leftStart == null || leftEnd == null) return null;
      return { left: leftStart, width: leftEnd - leftStart };
    },
    [getPixelCursorLeftFromNumber],
  );

  const pixelPositionsSelectionZone = useMemo(() => {
    if (!selectionZone) return null;
    return getStyleForZone(selectionZone);
  }, [getStyleForZone, selectionZone]);

  const pixelPositionMaskZones = useMemo(
    () => maskZones.map(getStyleForZone),
    [getStyleForZone, maskZones],
  );
  return (
    <>
      {isSelectionValid && pixelPositionsSelectionZone && (
        <div
          className="absolute h-full w-full rounded border-2 border-solid border-black bg-blue-700 opacity-60"
          style={{ ...pixelPositionsSelectionZone }}
        />
      )}
      {isSelectionValid &&
        pixelPositionMaskZones.map((maskZone) => {
          if (!maskZone) return null;
          return (
            <div
              key={maskZone.left}
              className="absolute h-full w-full bg-gray-200 opacity-60"
              style={{ ...maskZone }}
            />
          );
        })}
    </>
  );
}

export default SelectionRow;
