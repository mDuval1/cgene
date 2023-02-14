import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import useSelectionStore from '../../stores/selectionStore';
import chunkLeft from '../helpers';
import SelectionBottomBar from './SelectionBottomBar';
import SelectionPopper from './SelectionPopper';
import SequenceViewerRow from './SequenceViewerRow/SequenceViewerRow';

interface SequenceViewProps {
  sequence: string;
}
export const CHARACTER_SIZE = 11.2016;

function SequenceView(props: SequenceViewProps) {
  const { sequence } = props;

  const { rightClickReference, setRightClickReference, setSelectionStart, setSelectionEnd } =
    useSelectionStore();
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setRightClickReference(null);
        setSelectionStart(null);
        setSelectionEnd(null);
      }
    };
    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div id="file-details" className="h-full">
      <p className="top-0 flex h-12 w-full bg-slate-200 p-2 text-xl font-bold">Sequence view</p>
      <div className="bg-white-100  flex-1 overflow-scroll">
        <div className="flex flex-col divide-y-2 p-4" ref={containerRef}>
          {sequenceRows.map((sequenceRow, index) => (
            <SequenceViewerRow
              key={sequenceRow}
              sequenceRow={sequenceRow}
              charactersPerRow={charactersPerRow}
              index={index}
            />
          ))}
        </div>
        {rightClickReference && <SelectionPopper referenceElement={rightClickReference} />}
      </div>
      <div className="sticky bottom-0 h-8 w-full bg-slate-200">
        <SelectionBottomBar />
      </div>
    </div>
  );
}

export default SequenceView;
