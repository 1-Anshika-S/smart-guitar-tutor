import { useEffect, useRef, useState } from "react";

type CameraStatus = "idle" | "starting" | "active" | "error";

function CameraStage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
        error instanceof Error
          ? error.message
          : "Unable to start the camera.";

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
          className="webcam-video"
          autoPlay
          playsInline
          muted
        />

        {!isCameraActive && (
          <div className="camera-video-placeholder">
            <div>
              <p className="camera-title">Webcam feed will appear here</p>
              <p className="camera-subtitle">
                Start the camera, then place your guitar in view. The canvas
                overlay will be added in the next phase.
              </p>

              {errorMessage ? (
                <p className="camera-error">{errorMessage}</p>
              ) : null}
            </div>
          </div>
        )}

        <div className="camera-overlay-placeholder">
          <div className="overlay-frame">
            <span className="overlay-corner top-left" />
            <span className="overlay-corner top-right" />
            <span className="overlay-corner bottom-left" />
            <span className="overlay-corner bottom-right" />
          </div>
        </div>
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

      <p className="camera-note">
        Camera access works on localhost during development. When deployed, the
        app must be served over HTTPS.
      </p>
    </section>
  );
}

export default CameraStage;