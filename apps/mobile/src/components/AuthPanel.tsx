import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function AuthPanel(): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Auth (MVP)</Text>
      <Text style={styles.copy}>Email + phone login will be powered by Supabase Auth.</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Continue with Email</Text>
      </Pressable>
      <Pressable style={styles.buttonSecondary}>
        <Text style={styles.buttonText}>Continue with Phone</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#181c24',
    borderRadius: 12,
    padding: 12,
    gap: 8
  },
  heading: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  copy: {
    color: '#9da5b4',
    marginBottom: 4
  },
  button: {
    backgroundColor: '#4568ff',
    borderRadius: 8,
    padding: 10
  },
  buttonSecondary: {
    backgroundColor: '#2e3440',
    borderRadius: 8,
    padding: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
});
