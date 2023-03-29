import { StyleSheet } from 'react-native';
import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import { API_KEY } from '@env'

export default function App() {
  return (
    <NativeBaseProvider >
      <Box flex={1} bg="amber.300" alignItems="center" justifyContent="center" >
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
    </NativeBaseProvider>
  );
}


