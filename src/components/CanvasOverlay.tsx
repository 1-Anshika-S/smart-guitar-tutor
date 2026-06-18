import { useEffect, useRef } from "react";
import type { Chord } from "../types/chord";
import {
  clearCanvas,
  drawChordDots,
  drawFretboardGrid,
  getCanvasDisplaySize,
  getDefaultFretboardBounds,
  setupCanvasForDrawing,
} from "../utils/canvasUtils";

type CanvasOverlayProps = {
  chord: Chord;
};

function CanvasOverlay({ chord }: CanvasOverlayProps) {
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
      drawChordDots(ctx, fretboardBounds, chord);
    }

    draw();

    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [chord]);

  return <canvas ref={canvasRef} className="overlay-canvas" />;
}

export default CanvasOverlay;