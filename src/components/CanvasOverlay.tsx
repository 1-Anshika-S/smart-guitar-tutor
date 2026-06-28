import { useEffect, useRef } from "react";

import type { FretboardAlignment } from "../types/alignment";
import type { Chord } from "../types/chord";
import {
  clearCanvas,
  drawChordDots,
  drawFretboardGrid,
  drawStringIndicators,
  getCanvasDisplaySize,
  getFretboardBounds,
  setupCanvasForDrawing,
} from "../utils/canvasUtils";

type CanvasOverlayProps = {
  chord: Chord;
  alignment: FretboardAlignment;
};

function CanvasOverlay({ chord, alignment }: CanvasOverlayProps) {
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
      const fretboardBounds = getFretboardBounds(size, alignment);

    clearCanvas(ctx, size);
    drawFretboardGrid(ctx, fretboardBounds);
    drawStringIndicators(ctx, fretboardBounds, chord);
    drawChordDots(ctx, fretboardBounds, chord);
    }

    draw();

    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [chord, alignment]);

  return <canvas ref={canvasRef} className="overlay-canvas" />;
}

export default CanvasOverlay;