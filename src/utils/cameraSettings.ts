import type { FretboardAlignment } from "../types/alignment";

export type CameraSettings = {
  alignment: FretboardAlignment;
  isMirrored: boolean;
  cameraZoom: number;
};

const STORAGE_KEY = "fretwise-ar-camera-settings";

export const DEFAULT_CAMERA_SETTINGS: CameraSettings = {
  alignment: {
    xPercent: 16,
    yPercent: 28,
    widthPercent: 68,
    heightPercent: 42,
  },
  isMirrored: true,
  cameraZoom: 1,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNumberBetween(
  value: unknown,
  minimum: number,
  maximum: number
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= minimum &&
    value <= maximum
  );
}

function isValidAlignment(value: unknown): value is FretboardAlignment {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNumberBetween(value.xPercent, 0, 60) &&
    isNumberBetween(value.yPercent, 0, 75) &&
    isNumberBetween(value.widthPercent, 25, 95) &&
    isNumberBetween(value.heightPercent, 15, 75)
  );
}

function isValidCameraSettings(value: unknown): value is CameraSettings {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isValidAlignment(value.alignment) &&
    typeof value.isMirrored === "boolean" &&
    isNumberBetween(value.cameraZoom, 1, 2.5)
  );
}

export function loadCameraSettings(): CameraSettings | null {
  try {
    const savedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(savedValue);

    return isValidCameraSettings(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function saveCameraSettings(settings: CameraSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Saving settings is optional convenience behavior.
    // The app should still work if browser storage is unavailable.
  }
}