type PracticeControlsProps = {
  onPreviousChord: () => void;
  onNextChord: () => void;
  onRandomChord: () => void;
};

function PracticeControls({
  onPreviousChord,
  onNextChord,
  onRandomChord,
}: PracticeControlsProps) {
  return (
    <section className="panel">
      <p className="section-kicker">Practice Controls</p>
      <h2>Move Through Chords</h2>

      <div className="practice-controls">
        <button type="button" onClick={onPreviousChord}>
          Previous
        </button>

        <button type="button" onClick={onRandomChord}>
          Random
        </button>

        <button type="button" onClick={onNextChord}>
          Next
        </button>
      </div>
    </section>
  );
}

export default PracticeControls;