import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import chunkLeft from '../helpers';
import SelectionBottomBar from './SelectionBottomBar';
import SequenceViewerRow from './SequenceViewerRow/SequenceViewerRow';

interface SequenceViewProps {
  sequence: string;
}
export const CHARACTER_SIZE = 11.2016;

function SequenceView(props: SequenceViewProps) {
  const { sequence } = props;

  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const charactersPerRow = containerWidth === 0 ? 10 : Math.floor(containerWidth / CHARACTER_SIZE);

  const computeContainerWidth = () => {
    if (containerRef.current == null) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const widthMinusScrollPadding = width - 32;
    const maximumWidthDivisibleByCharacterSize =
      Math.floor(widthMinusScrollPadding / CHARACTER_SIZE) * CHARACTER_SIZE;
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
    <div>
      <div className="flex flex-col divide-y-2 p-4" ref={containerRef}>
        {sequenceRows.map((sequenceRow, index) => (
          <SequenceViewerRow
            key={sequenceRow}
            sequenceRow={sequenceRow}
            charactersPerRow={charactersPerRow}
            containerWidth={containerWidth}
            index={index}
          />
        ))}
      </div>
      <div className="sticky bottom-0 h-8 w-full bg-slate-200">
        <SelectionBottomBar />
      </div>
    </div>
  );
}

export default SequenceView;
