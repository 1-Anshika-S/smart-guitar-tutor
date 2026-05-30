function CameraStage() {
  return (
    <section className="camera-stage-panel">
      <div className="camera-stage-header">
        <div>
          <p className="section-kicker">Camera Stage</p>
          <h2>Webcam Overlay Area</h2>
        </div>

        <span className="camera-status-badge">Preview Mode</span>
      </div>

      <div className="camera-stage">
        <div className="camera-video-placeholder">
          <div>
            <p className="camera-title">Webcam feed will appear here</p>
            <p className="camera-subtitle">
            </p>
          </div>
        </div>

        <div className="camera-overlay-placeholder">
          <div className="overlay-frame">
            <span className="overlay-corner top-left" />
            <span className="overlay-corner top-right" />
            <span className="overlay-corner bottom-left" />
            <span className="overlay-corner bottom-right" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CameraStage;