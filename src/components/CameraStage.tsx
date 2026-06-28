import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import AlignmentControls from "./AlignmentControls";
import CanvasOverlay from "./CanvasOverlay";
import type { FretboardAlignment } from "../types/alignment";
import type { Chord } from "../types/chord";
import {
  DEFAULT_CAMERA_SETTINGS,
  loadCameraSettings,
  saveCameraSettings,
  type CameraSettings,
} from "../utils/cameraSettings";

type CameraStatus = "idle" | "starting" | "active" | "error";

type CameraStageProps = {
  chord: Chord;
};

function getCameraErrorMessage(error: unknown): string {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") {
      return "Camera permission was blocked. Enable camera access in your browser settings, then reload the page.";
    }

    if (error.name === "NotFoundError") {
      return "No camera was found. Connect a camera and try again.";
    }

    if (error.name === "NotReadableError") {
      return "The camera is already being used by another application or browser tab.";
    }

    if (error.name === "OverconstrainedError") {
      return "The available camera cannot meet the requested settings.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to start the camera.";
}

function CameraStage({ chord }: CameraStageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [initialCameraSettings] = useState<CameraSettings>(
    () => loadCameraSettings() ?? DEFAULT_CAMERA_SETTINGS
  );

  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [alignment, setAlignment] = useState<FretboardAlignment>(
    initialCameraSettings.alignment
  );

  const [isMirrored, setIsMirrored] = useState(
    initialCameraSettings.isMirrored
  );

  const [cameraZoom, setCameraZoom] = useState(
    initialCameraSettings.cameraZoom
  );

  useEffect(() => {
    saveCameraSettings({
      alignment,
      isMirrored,
      cameraZoom,
    });
  }, [alignment, isMirrored, cameraZoom]);

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
      setErrorMessage(getCameraErrorMessage(error));
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

  function resetCameraSetup() {
    setAlignment(DEFAULT_CAMERA_SETTINGS.alignment);
    setIsMirrored(DEFAULT_CAMERA_SETTINGS.isMirrored);
    setCameraZoom(DEFAULT_CAMERA_SETTINGS.cameraZoom);
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
            } as CSSProperties
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
          max="2.5"
          step="0.1"
          value={cameraZoom}
          onChange={(event) => setCameraZoom(Number(event.target.value))}
        />
      </label>

      <AlignmentControls
        alignment={alignment}
        onAlignmentChange={setAlignment}
        onReset={() => setAlignment(DEFAULT_CAMERA_SETTINGS.alignment)}
      />

      <button
        type="button"
        className="camera-setup-reset"
        onClick={resetCameraSetup}
      >
        Reset camera setup
      </button>

      <p className="camera-note">
        Camera position, zoom, mirror preference, and fretboard alignment save
        automatically in this browser.
      </p>
    </section>
  );
}

export default CameraStage;