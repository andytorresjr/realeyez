export interface ProvenancePayload {
  captureSessionId: string;
  deviceIdHash: string;
  startedAtMs: number;
  endedAtMs: number;
  signature: string;
}

export interface ClipMeta {
  uri: string;
  startedAtMs: number;
  endedAtMs: number;
}

export interface CaptureSession {
  sessionId: string;
  deviceIdHash: string;
  startedAtMs: number;
  clips: ClipMeta[];
}

export function createCaptureSession(deviceIdHash: string): CaptureSession {
  return {
    sessionId: generateSessionId(),
    deviceIdHash,
    startedAtMs: Date.now(),
    clips: [],
  };
}

export function addClipToSession(session: CaptureSession, clip: ClipMeta): CaptureSession {
  return { ...session, clips: [...session.clips, clip] };
}

export function removeLastClip(session: CaptureSession): CaptureSession {
  return { ...session, clips: session.clips.slice(0, -1) };
}

export function buildProvenancePayload(
  session: CaptureSession,
  signature: string
): ProvenancePayload {
  const lastClip = session.clips[session.clips.length - 1];
  const endedAtMs = lastClip ? lastClip.endedAtMs : Date.now();
  return {
    captureSessionId: session.sessionId,
    deviceIdHash: session.deviceIdHash,
    startedAtMs: session.startedAtMs,
    endedAtMs,
    signature,
  };
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

function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
