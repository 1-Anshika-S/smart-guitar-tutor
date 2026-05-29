function InstructionsPanel() {
  return (
    <section className="panel">
      <p className="section-kicker">Build Plan</p>
      <h2>Version 1 Workflow</h2>

      <ol className="instruction-list">
        <li>Select a chord from the dropdown.</li>
        <li>Start the webcam preview.</li>
        <li>Align the virtual fretboard over the real guitar.</li>
        <li>Follow the finger placement dots.</li>
      </ol>
    </section>
  );
}

export default InstructionsPanel;