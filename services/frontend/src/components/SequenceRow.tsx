import { Axis, Orientation } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { useCallback, useMemo, useRef } from 'react';

import useSelectionStore from '../stores/selectionStore';
import NucleotideCharacter from './NucleotideCharacter';

interface SequenceRowProps {
  charactersPerRow: number;
  containerWidth: number;
  index: number;
  sequenceRow: string;
}

function SequenceRow({ sequenceRow, containerWidth, charactersPerRow, index }: SequenceRowProps) {
  const characterIndexStart = charactersPerRow * index + 1;
  const characterIndexEnd = characterIndexStart + charactersPerRow;
  const scale = scaleLinear({
    domain: [characterIndexStart - 0.5, characterIndexEnd - 0.5], // x-coordinate data values
    range: [0, containerWidth], // svg x-coordinates, svg x-coordinates increase left to right
    round: true,
  });

  const { cursorPosition, setCursorPosition, setHoveredCursorPosition, hoveredCursorPosition } =
    useSelectionStore();

  const rowContainer = useRef<HTMLDivElement | null>(null);

  const getCursorPositionFromEvent = (e: React.MouseEvent<HTMLDivElement>): number | null => {
    if (rowContainer.current == null) return null;
    const { left, width } = rowContainer.current.getBoundingClientRect();
    const xPosition = ((e.clientX - left) / width) * sequenceRow.length + 0.5;
    return Math.floor(characterIndexStart + xPosition) - 1;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPosition(getCursorPositionFromEvent(e));
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCursorPosition(getCursorPositionFromEvent(e));
  };

  const getPixelCursorLeft = useCallback(
    (position: number | null) => {
      if (position == null) return null;
      if (rowContainer.current == null) return null;
      if (position < characterIndexStart - 1 || position > characterIndexEnd) return null;
      const { width } = rowContainer.current.getBoundingClientRect();
      return Math.round(((position - characterIndexStart + 1) / sequenceRow.length) * width);
    },
    [characterIndexEnd, characterIndexStart, sequenceRow.length],
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="relative flex flex-col"
      onClick={handleClick}
      ref={rowContainer}
      onMouseMove={handleHover}
    >
      {/* <span className="font-mono tracking-widest">{sequenceRow}</span> */}
      <div className="font-mono tracking-widest">
        {sequenceRow.split('').map((c, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <NucleotideCharacter key={i} character={c} />
        ))}
      </div>
      <svg className="mb-3 h-5">
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
    </div>
  );
}

export default SequenceRow;
