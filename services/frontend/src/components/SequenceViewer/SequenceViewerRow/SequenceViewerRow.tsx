import { Axis, Orientation } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { useCallback, useRef } from 'react';

import useSelectionStore from '../../../stores/selectionStore';
import { CHARACTER_SIZE } from '../SequenceViewer';
import CursorRow from './components/CursorRow';
import NucleotideCharacter from './components/NucleotideCharacter';
import SelectionRow from './components/SelectionRow';

interface SequenceViewerRowProps {
  charactersPerRow: number;
  containerWidth: number;
  index: number;
  sequenceRow: string;
}

const isRightClickInteraction = (e: React.MouseEvent<HTMLDivElement>) => e.button === 2;

function SequenceViewerRow({
  sequenceRow,
  containerWidth,
  charactersPerRow,
  index,
}: SequenceViewerRowProps) {
  const characterIndexStart = charactersPerRow * index + 1;
  const characterMaxPossibleIndex = characterIndexStart + charactersPerRow;
  const characterIndexEnd = characterIndexStart + sequenceRow.length;
  const scale = scaleLinear({
    domain: [characterIndexStart - 0.5, characterMaxPossibleIndex - 0.5], // x-coordinate data values
    range: [0, containerWidth], // svg x-coordinates, svg x-coordinates increase left to right
    round: true,
  });

  const { setHoveredCursorPosition, setSelectionStart, setSelectionEnd } = useSelectionStore();

  const rowContainer = useRef<HTMLDivElement | null>(null);

  const getCursorPositionFromEvent = (e: React.MouseEvent<HTMLDivElement>): number | null => {
    if (rowContainer.current == null) return null;
    const { left } = rowContainer.current.getBoundingClientRect();
    const width = sequenceRow.length * CHARACTER_SIZE;
    const xPosition = ((e.clientX - left) / width) * sequenceRow.length + 0.5;
    return Math.min(
      Math.floor(characterIndexStart + xPosition) - 1,
      characterIndexStart + sequenceRow.length - 1,
    );
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCursorPosition(getCursorPositionFromEvent(e));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRightClickInteraction(e)) {
      e.preventDefault();
      return;
    }
    setSelectionStart(getCursorPositionFromEvent(e));
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRightClickInteraction(e)) {
      e.preventDefault();
      return;
    }
    setSelectionEnd(getCursorPositionFromEvent(e));
  };

  const getPixelCursorLeftFromNumber = useCallback(
    (position: number) => {
      if (rowContainer.current == null) return 0;
      if (position < characterIndexStart - 1 || position > characterMaxPossibleIndex) return null;
      const width = sequenceRow.length * CHARACTER_SIZE;
      return Math.round(((position - characterIndexStart + 1) / sequenceRow.length) * width);
    },
    [characterMaxPossibleIndex, characterIndexStart, sequenceRow.length],
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="relative select-none"
      ref={rowContainer}
      onMouseMove={handleHover}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <SelectionRow
        characterIndexEnd={characterIndexEnd}
        characterIndexStart={characterIndexStart}
        getPixelCursorLeftFromNumber={getPixelCursorLeftFromNumber}
      />
      <div className="font-mono tracking-widest">
        {sequenceRow.split('').map((c, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <NucleotideCharacter key={i} character={c} />
        ))}
      </div>
      <svg className="mb-3 h-5 w-full">
        <g>
          <Axis
            orientation={Orientation.bottom}
            scale={scale}
            numTicks={8}
            labelProps={{ x: 20 }}
            hideAxisLine
          />
        </g>
      </svg>
      <CursorRow getPixelCursorLeftFromNumber={getPixelCursorLeftFromNumber} />
    </div>
  );
}

export default SequenceViewerRow;
