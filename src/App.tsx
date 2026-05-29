import { useState } from "react";
import "./App.css";

import CameraPlaceholder from "./components/CameraPlaceholder";
import ChordDetails from "./components/ChordDetails";
import ChordSelector from "./components/ChordSelector";
import FretboardPreview from "./components/FretboardPreview";
import InstructionsPanel from "./components/InstructionsPanel";
import { chords } from "./data/chords";

function App() {
  const [selectedChordId, setSelectedChordId] = useState(chords[0].id);

  const selectedChord =
    chords.find((chord) => chord.id === selectedChordId) ?? chords[0];

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">Version 1 MVP</p>
        <h1>Smart Guitar Tutor</h1>
        <p className="header-text">
          An AR-style guitar chord trainer that will use a webcam and canvas
          overlay to show finger placement on a real guitar.
        </p>
      </header>

      <section className="layout">
        <div className="left-column">
          <ChordSelector
            chords={chords}
            selectedChordId={selectedChordId}
            onChordChange={setSelectedChordId}
          />

          <ChordDetails chord={selectedChord} />

          <InstructionsPanel />
        </div>

        <div className="right-column">
          <CameraPlaceholder />
          <FretboardPreview chord={selectedChord} />
        </div>
      </section>
    </main>
  );
}

export default App;