export interface ReadSequenceOutput {
  description: string;
  sequence: string;
}

export type SequenceFileReader = (file: File) => Promise<ReadSequenceOutput>;
