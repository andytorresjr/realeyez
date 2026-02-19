import { describe, expect, it } from 'vitest';
import { validateProvenancePayload } from '../src/provenance';

describe('validateProvenancePayload', () => {
  it('accepts valid payload', () => {
    expect(
      validateProvenancePayload({
        captureSessionId: 'session-1',
        deviceIdHash: 'hash-1',
        startedAtMs: 1000,
        endedAtMs: 5000,
        signature: 'sig'
      })
    ).toBe(true);
  });

  it('rejects inverted timestamps', () => {
    expect(
      validateProvenancePayload({
        captureSessionId: 'session-1',
        deviceIdHash: 'hash-1',
        startedAtMs: 5000,
        endedAtMs: 1000,
        signature: 'sig'
      })
    ).toBe(false);
  });
});
