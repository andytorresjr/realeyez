import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProvenancePayload } from '../src/provenance.js';

test('accepts valid payload', () => {
  assert.equal(
    validateProvenancePayload({
      captureSessionId: 'session-1',
      deviceIdHash: 'hash-1',
      startedAtMs: 1000,
      endedAtMs: 5000,
      signature: 'sig'
    }),
    true
  );
});

test('rejects inverted timestamps', () => {
  assert.equal(
    validateProvenancePayload({
      captureSessionId: 'session-1',
      deviceIdHash: 'hash-1',
      startedAtMs: 5000,
      endedAtMs: 1000,
      signature: 'sig'
    }),
    false
  );
});
