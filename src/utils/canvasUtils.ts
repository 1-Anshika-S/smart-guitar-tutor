export type CanvasSize = {
  width: number;
  height: number;
};

export type FretboardBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  fretCount: number;
};

export function setupCanvasForDrawing(
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D | null {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;

  canvas.width = Math.floor(rect.width * scale);
  canvas.height = Math.floor(rect.height * scale);

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  return ctx;
}

export function getCanvasDisplaySize(canvas: HTMLCanvasElement): CanvasSize {
  const rect = canvas.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
  };
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  size: CanvasSize
) {
  ctx.clearRect(0, 0, size.width, size.height);
}

export function getDefaultFretboardBounds(size: CanvasSize): FretboardBounds {
  return {
    x: size.width * 0.16,
    y: size.height * 0.28,
    width: size.width * 0.68,
    height: size.height * 0.42,
    fretCount: 5,
  };
}

export function drawFretboardGrid(
  ctx: CanvasRenderingContext2D,
  bounds: FretboardBounds
) {
  const stringCount = 6;
  const stringSpacing = bounds.height / (stringCount - 1);
  const fretSpacing = bounds.width / bounds.fretCount;

  ctx.save();

  ctx.fillStyle = "rgba(15, 23, 42, 0.22)";
  ctx.strokeStyle = "rgba(191, 219, 254, 0.9)";
  ctx.lineWidth = 2;

  ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
  ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);

  ctx.strokeStyle = "rgba(226, 232, 240, 0.75)";
  ctx.lineWidth = 2;

  for (let stringIndex = 0; stringIndex < stringCount; stringIndex += 1) {
    const y = bounds.y + stringIndex * stringSpacing;

    ctx.beginPath();
    ctx.moveTo(bounds.x, y);
    ctx.lineTo(bounds.x + bounds.width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(147, 197, 253, 0.85)";
  ctx.lineWidth = 3;

  for (let fretIndex = 0; fretIndex <= bounds.fretCount; fretIndex += 1) {
    const x = bounds.x + fretIndex * fretSpacing;

    ctx.beginPath();
    ctx.moveTo(x, bounds.y);
    ctx.lineTo(x, bounds.y + bounds.height);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(248, 250, 252, 0.95)";
  ctx.font = "700 13px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let fretIndex = 1; fretIndex <= bounds.fretCount; fretIndex += 1) {
    const x = bounds.x + (fretIndex - 0.5) * fretSpacing;
    const y = bounds.y + bounds.height + 22;

    ctx.fillText(`Fret ${fretIndex}`, x, y);
  }

  ctx.fillStyle = "rgba(191, 219, 254, 0.95)";
  ctx.font = "800 14px system-ui";
  ctx.textAlign = "right";

  for (let stringIndex = 0; stringIndex < stringCount; stringIndex += 1) {
    const stringNumber = 6 - stringIndex;
    const x = bounds.x - 12;
    const y = bounds.y + stringIndex * stringSpacing;

    ctx.fillText(String(stringNumber), x, y);
  }

  ctx.restore();
}