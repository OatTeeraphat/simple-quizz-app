import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaderboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
  },
});

export default LeaderboardScreen;
