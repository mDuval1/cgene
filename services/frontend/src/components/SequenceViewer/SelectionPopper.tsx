import { type VirtualElement } from '@popperjs/core';
import { useState } from 'react';
import { usePopper } from 'react-popper';

export const POPPER_WIDTH = 200;
export const POPPER_HEIGHT = 300;

interface SelectionPopperProps {
  referenceElement: VirtualElement | null;
}

function SelectionPopper({ referenceElement }: SelectionPopperProps) {
  const [popperElement, setPopperElement] = useState<null | HTMLDivElement>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-POPPER_WIDTH / 2, -POPPER_HEIGHT + 50],
        },
      },
    ],
  });

  return (
    <div
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
      className="z-10 rounded-md bg-white p-4 drop-shadow-lg"
    >
      <button type="button" className="rounded bg-slate-500 px-2 py-1">
        Create annotation
      </button>
    </div>
  );
}

export default SelectionPopper;
