import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function FeedPlaceholder(): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>For You (placeholder)</Text>
      <Text style={styles.copy}>Ranking signals: follows, likes, comments, watch time, recency, hashtags.</Text>
      <Text style={styles.copy}>No camera roll upload path will be implemented.</Text>
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
    color: '#9da5b4'
  }
});
