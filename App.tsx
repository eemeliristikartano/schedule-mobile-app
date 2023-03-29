import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    <NativeBaseProvider >
      <Box flex={1} bg="muted.200" alignItems="center" justifyContent="center" >
        <HomeScreen />
      </Box>
    </NativeBaseProvider>
  );
}


