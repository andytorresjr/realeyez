/**
 * CameraScreen — multi-clip in-app capture with provenance tracking.
 *
 * REQUIRES: Expo Dev Client (bare workflow) — react-native-vision-camera
 * is a native module and cannot run in the Expo Go app.
 * Run: `npx expo install expo-dev-client` then rebuild the native app.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {
  type CaptureSession,
  type ClipMeta,
  addClipToSession,
  buildProvenancePayload,
  createCaptureSession,
  removeLastClip,
} from '@realeyez/core';
import { CaptureControls } from '../components/CaptureControls';

// Placeholder device hash — replace with expo-device / expo-crypto in production.
const DEV_DEVICE_HASH = 'dev-device-placeholder';

// Placeholder signature — replace with HMAC signing in production (Stage 2).
const DEV_SIGNATURE = 'dev-signature-placeholder';

export interface CaptureResult {
  clips: ClipMeta[];
  session: CaptureSession;
}

interface Props {
  onDone: (result: CaptureResult) => void;
  onCancel: () => void;
}

export function CameraScreen({ onDone, onCancel }: Props): React.JSX.Element {
  const { hasPermission: hasCam, requestPermission: requestCam } = useCameraPermission();
  const { hasPermission: hasMic, requestPermission: requestMic } = useMicrophonePermission();

  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
  const [isRecording, setIsRecording] = useState(false);
  const [session, setSession] = useState<CaptureSession>(() =>
    createCaptureSession(DEV_DEVICE_HASH)
  );

  const camera = useRef<Camera>(null);
  const clipStartMs = useRef<number>(0);
  const device = useCameraDevice(cameraPosition);

  // Request permissions on mount.
  useEffect(() => {
    if (!hasCam) requestCam();
    if (!hasMic) requestMic();
  }, [hasCam, hasMic, requestCam, requestMic]);

  const handleRecord = useCallback(() => {
    if (isRecording) {
      camera.current?.stopRecording();
    } else {
      clipStartMs.current = Date.now();
      setIsRecording(true);
      camera.current?.startRecording({
        onRecordingFinished: (video) => {
          const clip: ClipMeta = {
            uri: video.path,
            startedAtMs: clipStartMs.current,
            endedAtMs: Date.now(),
          };
          setSession((prev) => addClipToSession(prev, clip));
          setIsRecording(false);
        },
        onRecordingError: (error) => {
          console.error('[CameraScreen] Recording error:', error);
          setIsRecording(false);
          Alert.alert('Recording failed', error.message);
        },
      });
    }
  }, [isRecording]);

  const handleDeleteLast = useCallback(() => {
    setSession((prev) => removeLastClip(prev));
  }, []);

  const handleFlipCamera = useCallback(() => {
    setCameraPosition((pos) => (pos === 'back' ? 'front' : 'back'));
  }, []);

  const handleDone = useCallback(() => {
    const payload = buildProvenancePayload(session, DEV_SIGNATURE);
    console.log('[CameraScreen] Provenance payload:', payload);
    onDone({ clips: session.clips, session });
  }, [session, onDone]);

  if (!hasCam || !hasMic) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#fff" size="large" />
        <Text style={styles.permissionText}>Requesting camera &amp; microphone access…</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>No camera device found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        audio={true}
      />

      {/* Clip count badge */}
      {session.clips.length > 0 && !isRecording && (
        <View style={styles.clipBadge}>
          <Text style={styles.clipBadgeText}>
            {session.clips.length} clip{session.clips.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Controls pinned to bottom */}
      <View style={styles.controls}>
        <CaptureControls
          isRecording={isRecording}
          clips={session.clips}
          onRecord={handleRecord}
          onDeleteLast={handleDeleteLast}
          onFlipCamera={handleFlipCamera}
          onDone={handleDone}
          onCancel={onCancel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    backgroundColor: '#0f1115',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  permissionText: {
    color: '#9da5b4',
    textAlign: 'center',
  },
  clipBadge: {
    position: 'absolute',
    top: 56,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  clipBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
