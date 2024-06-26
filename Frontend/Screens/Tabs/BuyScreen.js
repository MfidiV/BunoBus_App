// HistoryScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BuyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BuyScreen;
