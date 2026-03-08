import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import type { ClipMeta } from '@realeyez/core';

interface Props {
  isRecording: boolean;
  clips: ClipMeta[];
  onRecord: () => void;
  onDeleteLast: () => void;
  onFlipCamera: () => void;
  onDone: () => void;
  onCancel: () => void;
}

export function CaptureControls({
  isRecording,
  clips,
  onRecord,
  onDeleteLast,
  onFlipCamera,
  onDone,
  onCancel,
}: Props): React.JSX.Element {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      Animated.timing(pulseAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    }
  }, [isRecording, pulseAnim]);

  const totalDurationMs = clips.reduce(
    (sum, c) => sum + (c.endedAtMs - c.startedAtMs),
    0
  );
  const totalSecs = Math.floor(totalDurationMs / 1000);
  const canDone = clips.length > 0 && !isRecording;

  return (
    <View style={styles.wrapper}>
      {/* Clip dots + timer */}
      <View style={styles.topRow}>
        <View style={styles.clipDots}>
          {clips.map((_, i) => (
            <View key={i} style={styles.clipDot} />
          ))}
          {isRecording && <View style={[styles.clipDot, styles.clipDotActive]} />}
        </View>
        <Text style={styles.timer}>
          {String(Math.floor(totalSecs / 60)).padStart(2, '0')}:
          {String(totalSecs % 60).padStart(2, '0')}
        </Text>
      </View>

      {/* Main controls */}
      <View style={styles.controlRow}>
        {/* Cancel / Delete last */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={clips.length > 0 && !isRecording ? onDeleteLast : onCancel}
          accessibilityLabel={clips.length > 0 && !isRecording ? 'Delete last clip' : 'Cancel'}
        >
          <Text style={styles.sideButtonText}>
            {clips.length > 0 && !isRecording ? '⌫' : '✕'}
          </Text>
          <Text style={styles.sideButtonLabel}>
            {clips.length > 0 && !isRecording ? 'Delete' : 'Cancel'}
          </Text>
        </TouchableOpacity>

        {/* Record button */}
        <TouchableOpacity onPress={onRecord} activeOpacity={0.8}>
          <Animated.View
            style={[
              styles.recordOuter,
              isRecording && styles.recordOuterActive,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View style={[styles.recordInner, isRecording && styles.recordInnerActive]} />
          </Animated.View>
        </TouchableOpacity>

        {/* Flip / Done */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={canDone ? onDone : onFlipCamera}
          accessibilityLabel={canDone ? 'Done' : 'Flip camera'}
        >
          <Text style={styles.sideButtonText}>{canDone ? '✓' : '⇄'}</Text>
          <Text style={styles.sideButtonLabel}>{canDone ? 'Done' : 'Flip'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 36,
    paddingHorizontal: 24,
    gap: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clipDots: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  clipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  clipDotActive: {
    backgroundColor: '#e63946',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  timer: {
    color: '#fff',
    fontSize: 16,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideButton: {
    alignItems: 'center',
    gap: 4,
    width: 60,
  },
  sideButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  sideButtonLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
  },
  recordOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordOuterActive: {
    borderColor: '#e63946',
  },
  recordInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e63946',
  },
  recordInnerActive: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#e63946',
  },
});
