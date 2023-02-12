import { Axis, Orientation } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import chunkLeft from './helpers';
import SequenceRow from './SequenceRow';

interface SequenceViewProps {
  sequence: string;
}

function SequenceView(props: SequenceViewProps) {
  const { sequence } = props;

  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const characterSize = 11.2016;
  const charactersPerRow = containerWidth === 0 ? 10 : Math.floor(containerWidth / characterSize);

  const computeContainerWidth = () => {
    if (containerRef.current == null) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const widthMinusScrollPadding = width - 32;
    const maximumWidthDivisibleByCharacterSize =
      Math.floor(widthMinusScrollPadding / characterSize) * characterSize;
    setContainerWidth(maximumWidthDivisibleByCharacterSize);
  };

  useLayoutEffect(() => {
    computeContainerWidth();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', computeContainerWidth);
    return () => {
      window.removeEventListener('resize', computeContainerWidth);
    };
  }, []);

  const sequenceRows = useMemo(
    () => chunkLeft(sequence, charactersPerRow),
    [charactersPerRow, sequence],
  );

  return (
    <div className="flex flex-col divide-y-2 p-4" ref={containerRef}>
      {sequenceRows.map((sequenceRow, index) => {
        const characterIndexStart = charactersPerRow * index + 1;
        const characterIndexEnd = characterIndexStart + charactersPerRow;
        const scale = scaleLinear({
          domain: [characterIndexStart - 0.5, characterIndexEnd - 0.5], // x-coordinate data values
          range: [0, containerWidth], // svg x-coordinates, svg x-coordinates increase left to right
          round: true,
        });
        return (
          <div className="flex flex-col" key={sequenceRow}>
            <SequenceRow sequenceRow={sequenceRow} />
            <svg className="mb-4 h-5">
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
          </div>
        );
      })}
    </div>
  );
}

export default SequenceView;
