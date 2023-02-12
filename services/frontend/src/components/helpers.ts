export default function chunkLeft(str: string, size = 3): string[] {
  const { length } = str;
  const chunks = Array<string>(Math.ceil(length / size));
  for (let i = 0, index = 0; index < length; i += 1) {
    chunks[i] = str.slice(index, (index += size));
  }
  return chunks;
}
