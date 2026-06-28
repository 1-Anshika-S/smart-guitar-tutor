import { useEffect, useRef, useState } from "react";

import AlignmentControls from "./AlignmentControls";
import CanvasOverlay from "./CanvasOverlay";
import type { FretboardAlignment } from "../types/alignment";
import type { Chord } from "../types/chord";

type CameraStatus = "idle" | "starting" | "active" | "error";

type CameraStageProps = {
  chord: Chord;
};

const DEFAULT_ALIGNMENT: FretboardAlignment = {
  xPercent: 16,
  yPercent: 28,
  widthPercent: 68,
  heightPercent: 42,
};

function CameraStage({ chord }: CameraStageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [alignment, setAlignment] = useState<FretboardAlignment>(DEFAULT_ALIGNMENT);
  const [cameraZoom, setCameraZoom] = useState(1);

  // This mirrors ONLY the webcam video.
  // It does NOT change the canvas overlay or fretboard coordinate math.
  const [isMirrored, setIsMirrored] = useState(true);

  async function startCamera() {
    setCameraStatus("starting");
    setErrorMessage("");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("This browser does not support webcam access.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraStatus("active");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to start the camera.";

      setErrorMessage(message);
      setCameraStatus("error");
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraStatus("idle");
  }

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const isCameraActive = cameraStatus === "active";
  const isCameraStarting = cameraStatus === "starting";

  return (
    <section className="camera-stage-panel">
      <div className="camera-stage-header">
        <div>
          <p className="section-kicker">Camera Stage</p>
          <h2>Webcam Overlay Area</h2>
        </div>

        <span className="camera-status-badge">
          {cameraStatus === "idle" && "Camera Off"}
          {cameraStatus === "starting" && "Starting"}
          {cameraStatus === "active" && "Camera On"}
          {cameraStatus === "error" && "Camera Error"}
        </span>
      </div>

      <div className="camera-stage">
        <video
          ref={videoRef}
          className={`webcam-video ${isMirrored ? "mirrored" : ""}`}
          style={
            {
              "--camera-zoom": String(cameraZoom),
            } as React.CSSProperties
        }
        autoPlay
        playsInline
         muted
        />

        {!isCameraActive && (
          <div className="camera-video-placeholder">
            <div>
              <p className="camera-title">Webcam feed will appear here</p>
              <p className="camera-subtitle">
                Start the camera, then place your guitar in view. The fretboard
                guide is drawn on a canvas layer above the video.
              </p>

              {errorMessage ? (
                <p className="camera-error">{errorMessage}</p>
              ) : null}
            </div>
          </div>
        )}

        <CanvasOverlay chord={chord} alignment={alignment} />
      </div>

      <div className="camera-actions">
        <button
          type="button"
          onClick={startCamera}
          disabled={isCameraActive || isCameraStarting}
        >
          {isCameraStarting ? "Starting Camera..." : "Start Camera"}
        </button>

        <button type="button" onClick={stopCamera} disabled={!isCameraActive}>
          Stop Camera
        </button>
      </div>

      <label className="mirror-toggle">
        <input
          type="checkbox"
          checked={isMirrored}
          onChange={(event) => setIsMirrored(event.target.checked)}
        />
      Mirror webcam view
      </label>

      <label className="camera-zoom-control">
        <span>Camera zoom: {cameraZoom.toFixed(1)}x</span>

        <input
        type="range"
        min="1"
        max="5"
        step="0.1"
        value={cameraZoom}
        onChange={(event) => setCameraZoom(Number(event.target.value))}
      />
  </label>

<AlignmentControls
  alignment={alignment}
  onAlignmentChange={setAlignment}
  onReset={() => setAlignment(DEFAULT_ALIGNMENT)}
/>

      <p className="camera-note">
        Use the controls to match the virtual fretboard to the visible guitar
        neck.
      </p>
    </section>
  );
}

export default CameraStage;