// Entry for make.fun's "One Word, First Thought" bounty.
// The entry is exactly one word: the first that comes to mind. Ours is
// "Petrichor" — the smell of rain on dry earth. A single vivid, sensory
// word: surprise in the letter mix, a whole summer downpour in nine letters,
// and a spark of wit in choosing a word most people have felt but few can
// name. This program writes that word to entry.txt, byte for byte.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const WORD = "Petrichor";

function ensureSingleWord(word: string): void {
  if (word.length === 0) {
    throw new Error('entry word must not be empty');
  }
  if (word.length > 140) {
    throw new Error(`entry word must be at most 140 characters, got ${word.length}`);
  }
  if (/\s/.test(word)) {
    throw new Error('entry must be a single word with no whitespace');
  }
}

function resolveOutputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  return dir && dir.length > 0 ? dir : '/output';
}

function main(): void {
  ensureSingleWord(WORD);
  const dir = resolveOutputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, 'entry.txt');
  writeFileSync(target, WORD + '\n', 'utf8');
  console.log(`entry written to ${target}: ${WORD}`);
}

main();
