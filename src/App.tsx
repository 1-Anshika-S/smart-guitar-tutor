import { useState } from "react";
import "./App.css";

import CameraPlaceholder from "./components/CameraPlaceholder";
import ChordSelector from "./components/ChordSelector";
import InstructionsPanel from "./components/InstructionsPanel";
import { chords } from "./data/chords";

function App() {

  const [selectedChordID, setSelectedChordID] = useState(chords[0].id);

  const selectedChord =
    chords.find((chord) => chord.id === selectedChordID) ?? chords[0];

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">Version 1</p>
        <h1>Smart Guitar Tutor</h1>
        <p className="header-text">
          An AR-style guitar chord trainer that will use a webcam and canvas overlay to show finger placement on a real guitar.
        </p>
      </header>

      <section className="content">
        <div className="left-column">
          <ChordSelector
            chords={chords}
            selectedChordId={selectedChordID}
            onChordChange={setSelectedChordID}
          />

          <InstructionsPanel selectedChord={selectedChord} />
          </div>

        <div className="right-column">
          <CameraPlaceholder />
        </div>
      </section>
    </main>
  );
}

export default App;