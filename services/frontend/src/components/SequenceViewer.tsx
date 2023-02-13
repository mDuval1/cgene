import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import chunkLeft from './helpers';
import SelectionBottomBar from './SelectionBottomBar';
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
    <div>
      <div className="flex flex-col divide-y-2 p-4" ref={containerRef}>
        {sequenceRows.map((sequenceRow, index) => (
          <SequenceRow
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
