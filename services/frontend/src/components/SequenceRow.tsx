interface SequenceRowProps {
  sequenceRow: string;
}

function SequenceRow({ sequenceRow }: SequenceRowProps) {
  return <span className="font-mono tracking-widest">{sequenceRow}</span>;
}

export default SequenceRow;
