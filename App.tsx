import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Counter from './src/components/Counter/';
import Ingredient from './src/components/Ingredient/Ingredient';
import DoughCalculator from './src/screens/DoughCalculator';

export default function App() {
  const [value, setValue] = useState(0)
  return (
    <View style={styles.container}>
      <DoughCalculator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
