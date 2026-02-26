export interface Repl {
  input: ReadableStream;
  output: WritableStream;
  prompt: string;
}

export function cleanInput(input: string): string[] {
  return input.trim().split(" ").filter((part) => part.length > 0);
};
