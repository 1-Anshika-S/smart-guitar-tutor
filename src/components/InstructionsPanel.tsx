import type { Chord } from "../types/chord";

type InstructionsPanelProps = {
    selectedChord: Chord;
};

function InstructionsPanel({ selectedChord }: InstructionsPanelProps) {
  return (
    <section className="panel">
      <h2>Day 1 Build Status</h2>

      <p>
        Selected chord: <strong>{selectedChord.name}</strong>
      </p>

      <p>
        Finger positions loaded:{" "}
        <strong>{selectedChord.positions.length}</strong>
      </p>

      <ol className="instruction-list">
        <li>Set up React, TypeScript, and Vite.</li>
        <li>Create a typed chord database.</li>
        <li>Build a clean chord selector.</li>
        <li>Prepare the camera and overlay area.</li>
      </ol>
    </section>
  );
}

export default InstructionsPanel;