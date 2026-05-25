import type { Chord } from "../types/chord";

export const chords: Chord[] = [
  {
    id: "g-major",
    name: "G Major",
    positions: [
      { string: 6, fret: 3, finger: 2 },
      { string: 5, fret: 2, finger: 1 },
      { string: 1, fret: 3, finger: 3 },
    ],
  },

  {
    id: "c-major",
    name: "C Major",
    positions: [
      { string: 5, fret: 3, finger: 3 },
      { string: 4, fret: 2, finger: 2 },
      { string: 2, fret: 1, finger: 1 },
    ],
  },

  {
    id: "d-major",
    name: "D Major",
    positions: [
      { string: 3, fret: 2, finger: 1 },
      { string: 2, fret: 3, finger: 3 },
      { string: 1, fret: 2, finger: 2 },
    ],
  },
  
  {
    id: "e-minor",
    name: "E Minor",
    positions: [
      { string: 5, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
  },
];