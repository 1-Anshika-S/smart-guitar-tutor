export type FingerPosition = {
  string: number;
  fret: number;
  finger: number;
};

export type Chord = {
  id: string;
  name: string;
  positions: FingerPosition[];
};