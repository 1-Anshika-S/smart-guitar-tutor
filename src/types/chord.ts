export type StringNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type FingerNumber = 1 | 2 | 3 | 4;

export type FingerPosition = {
  string: StringNumber;
  fret: number;
  finger: FingerNumber;
};

export type Chord = {
  id: string;
  name: string;
  shortName: string;
  difficulty: "Beginner" | "Intermediate";
  positions: FingerPosition[];
  openStrings: StringNumber[];
  mutedStrings: StringNumber[];
};