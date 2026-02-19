import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthPanel } from './components/AuthPanel';
import { FeedPlaceholder } from './components/FeedPlaceholder';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Realeyez</Text>
      <Text style={styles.subtitle}>Capture in app. Share what is real.</Text>
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
    gap: 14
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700'
  },
  subtitle: {
    color: '#9da5b4'
  },
  cardRow: {
    gap: 12
  }
});
