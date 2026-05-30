import type { Chord } from "../types/chord";

export function getChordById(chords: Chord[], chordId: string): Chord {
  return chords.find((chord) => chord.id === chordId) ?? chords[0];
}

export function getNextChordId(chords: Chord[], currentChordId: string): string {
  const currentIndex = chords.findIndex((chord) => chord.id === currentChordId);

  if (currentIndex === -1) {
    return chords[0].id;
  }

  const nextIndex = (currentIndex + 1) % chords.length;

  return chords[nextIndex].id;
}

export function getPreviousChordId(
  chords: Chord[],
  currentChordId: string
): string {
  const currentIndex = chords.findIndex((chord) => chord.id === currentChordId);

  if (currentIndex === -1) {
    return chords[0].id;
  }

  const previousIndex =
    currentIndex === 0 ? chords.length - 1 : currentIndex - 1;

  return chords[previousIndex].id;
}

export function getRandomChordId(
  chords: Chord[],
  currentChordId: string
): string {
  if (chords.length <= 1) {
    return currentChordId;
  }

  const availableChords = chords.filter((chord) => chord.id !== currentChordId);
  const randomIndex = Math.floor(Math.random() * availableChords.length);

  return availableChords[randomIndex].id;
}