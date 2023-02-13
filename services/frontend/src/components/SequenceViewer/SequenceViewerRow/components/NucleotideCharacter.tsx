const NUCLEOTIDE_TO_COLOR = {
  a: 'text-red-600',
  c: 'text-blue-800',
  g: 'text-yellow-300',
  t: 'text-green-500',
};

interface NucleotideCharacterProps {
  character: string;
}

function NucleotideCharacter({ character }: NucleotideCharacterProps) {
  return (
    <span
      className={`text-opacity-1 ${
        NUCLEOTIDE_TO_COLOR[character.toLowerCase() as keyof typeof NUCLEOTIDE_TO_COLOR]
      }`}
    >
      {character}
    </span>
  );
}

export default NucleotideCharacter;
