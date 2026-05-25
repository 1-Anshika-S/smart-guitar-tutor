import type { Chord } from "../types/chord";

type ChordSelectorProps = {
  chords: Chord[];
  selectedChordId: string;
  onChordChange: (chordId: string) => void;
};

function ChordSelector({
  chords,
  selectedChordId,
  onChordChange,
}: ChordSelectorProps) {
  return (
    <section className="panel">
      <label className="input-label" htmlFor="chord-select">
        Choose a chord
      </label>

      <select
        id="chord-select"
        className="chord-select"
        value={selectedChordId}
        onChange={(event) => onChordChange(event.target.value)}
      >
        {chords.map((chord) => (
          <option key={chord.id} value={chord.id}>
            {chord.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default ChordSelector;