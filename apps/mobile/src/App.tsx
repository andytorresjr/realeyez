import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthPanel } from './components/AuthPanel';
import { FeedPlaceholder } from './components/FeedPlaceholder';
import { CameraScreen, type CaptureResult } from './screens/CameraScreen';

type Screen = 'home' | 'camera';

export default function App(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>('home');
  const [lastCapture, setLastCapture] = useState<CaptureResult | null>(null);

  if (screen === 'camera') {
    return (
      <CameraScreen
        onDone={(result) => {
          setLastCapture(result);
          setScreen('home');
        }}
        onCancel={() => setScreen('home')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Realeyez</Text>
      <Text style={styles.subtitle}>Capture in app. Share what is real.</Text>

      <TouchableOpacity style={styles.captureButton} onPress={() => setScreen('camera')}>
        <Text style={styles.captureButtonText}>● Start Recording</Text>
      </TouchableOpacity>

      {lastCapture && (
        <View style={styles.lastCaptureBadge}>
          <Text style={styles.lastCaptureText}>
            Last capture: {lastCapture.clips.length} clip
            {lastCapture.clips.length !== 1 ? 's' : ''} · session{' '}
            {lastCapture.session.sessionId.slice(0, 8)}…
          </Text>
        </View>
      )}

      <View style={styles.cardRow}>
        <AuthPanel />
        <FeedPlaceholder />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
    padding: 16,
    gap: 14,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9da5b4',
  },
  captureButton: {
    backgroundColor: '#e63946',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  lastCaptureBadge: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 8,
    padding: 10,
  },
  lastCaptureText: {
    color: '#9da5b4',
    fontSize: 13,
  },
  cardRow: {
    gap: 12,
  },
});
