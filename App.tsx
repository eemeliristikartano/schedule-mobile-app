import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import HomeScreen from "./src/screens/HomeScreen";
import Navigation from "./src/components/Navigation";

export default function App() {
  return (
    <NativeBaseProvider >
      <Navigation />
    </NativeBaseProvider>
  );
}


