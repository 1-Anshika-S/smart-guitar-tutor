import type { Chord } from "../types/chord";

export const chords: Chord[] = [
  {
    id: "g-major",
    name: "G Major",
    shortName: "G",
    difficulty: "Beginner",
    positions: [
      { string: 6, fret: 3, finger: 2 },
      { string: 5, fret: 2, finger: 1 },
      { string: 1, fret: 3, finger: 3 },
    ],
    openStrings: [4, 3, 2],
    mutedStrings: [],
  },

  {
    id: "c-major",
    name: "C Major",
    shortName: "C",
    difficulty: "Beginner",
    positions: [
      { string: 5, fret: 3, finger: 3 },
      { string: 4, fret: 2, finger: 2 },
      { string: 2, fret: 1, finger: 1 },
    ],
    openStrings: [3, 1],
    mutedStrings: [6],
  },

  {
    id: "d-major",
    name: "D Major",
    shortName: "D",
    difficulty: "Beginner",
    positions: [
      { string: 3, fret: 2, finger: 1 },
      { string: 2, fret: 3, finger: 3 },
      { string: 1, fret: 2, finger: 2 },
    ],
    openStrings: [4],
    mutedStrings: [6, 5],
  },

  {
    id: "a-major",
    name: "A Major",
    shortName: "A",
    difficulty: "Beginner",
    positions: [
      { string: 4, fret: 2, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 2, fret: 2, finger: 3 },
    ],
    openStrings: [5, 1],
    mutedStrings: [6],
  },

  {
    id: "e-major",
    name: "E Major",
    shortName: "E",
    difficulty: "Beginner",
    positions: [
      { string: 5, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
      { string: 3, fret: 1, finger: 1 },
    ],
    openStrings: [6, 2, 1],
    mutedStrings: [],
  },

  {
    id: "e-minor",
    name: "E Minor",
    shortName: "Em",
    difficulty: "Beginner",
    positions: [
      { string: 5, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
    openStrings: [6, 3, 2, 1],
    mutedStrings: [],
  },

  {
    id: "a-minor",
    name: "A Minor",
    shortName: "Am",
    difficulty: "Beginner",
    positions: [
      { string: 4, fret: 2, finger: 2 },
      { string: 3, fret: 2, finger: 3 },
      { string: 2, fret: 1, finger: 1 },
    ],
    openStrings: [5, 1],
    mutedStrings: [6],
  },
  
  {
    id: "d-minor",
    name: "D Minor",
    shortName: "Dm",
    difficulty: "Beginner",
    positions: [
      { string: 3, fret: 2, finger: 2 },
      { string: 2, fret: 3, finger: 3 },
      { string: 1, fret: 1, finger: 1 },
    ],
    openStrings: [4],
    mutedStrings: [6, 5],
  },
];