import { useEffect, useRef } from "react";
import {
  clearCanvas,
  drawFretboardGrid,
  getCanvasDisplaySize,
  getDefaultFretboardBounds,
  setupCanvasForDrawing,
} from "../utils/canvasUtils";

function CanvasOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const ctx = setupCanvasForDrawing(canvas);

      if (!ctx) {
        return;
      }

      const size = getCanvasDisplaySize(canvas);
      const fretboardBounds = getDefaultFretboardBounds(size);

      clearCanvas(ctx, size);
      drawFretboardGrid(ctx, fretboardBounds);
    }

    draw();

    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, []);

  return <canvas ref={canvasRef} className="overlay-canvas" />;
}

export default CanvasOverlay;