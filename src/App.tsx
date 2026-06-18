import { useState } from "react";
import "./App.css";

import CameraStage from "./components/CameraStage";import ChordDetails from "./components/ChordDetails";
import ChordSelector from "./components/ChordSelector";
import FretboardPreview from "./components/FretboardPreview";
import InstructionsPanel from "./components/InstructionsPanel";
import PracticeControls from "./components/PracticeControls";
import { chords } from "./data/chords";
import {
  getChordById,
  getNextChordId,
  getPreviousChordId,
  getRandomChordId,
} from "./utils/chordUtils";

function App() {
  const [selectedChordId, setSelectedChordId] = useState(chords[0].id);

  const selectedChord = getChordById(chords, selectedChordId);

  function handlePreviousChord() {
    setSelectedChordId(getPreviousChordId(chords, selectedChordId));
  }

  function handleNextChord() {
    setSelectedChordId(getNextChordId(chords, selectedChordId));
  }

  function handleRandomChord() {
    setSelectedChordId(getRandomChordId(chords, selectedChordId));
  }

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

          <PracticeControls
            onPreviousChord={handlePreviousChord}
            onNextChord={handleNextChord}
            onRandomChord={handleRandomChord}
          />

          <ChordDetails chord={selectedChord} />

          <InstructionsPanel />
        </div>

        <div className="right-column">
          <CameraStage chord={selectedChord} />
          <FretboardPreview chord={selectedChord} />
        </div>
      </section>
    </main>
  );
}

export default App;