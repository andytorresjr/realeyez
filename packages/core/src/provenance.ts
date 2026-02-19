export interface ProvenancePayload {
  captureSessionId: string;
  deviceIdHash: string;
  startedAtMs: number;
  endedAtMs: number;
  signature: string;
}

export function validateProvenancePayload(payload: ProvenancePayload): boolean {
  if (!payload.captureSessionId || !payload.deviceIdHash || !payload.signature) {
    return false;
  }

  if (payload.endedAtMs <= payload.startedAtMs) {
    return false;
  }

  const durationMs = payload.endedAtMs - payload.startedAtMs;
  const maxCaptureWindowMs = 1000 * 60 * 20;

  return durationMs > 0 && durationMs <= maxCaptureWindowMs;
}
