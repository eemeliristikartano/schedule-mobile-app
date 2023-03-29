import React from "react";
import { NativeBaseProvider } from "native-base";
import Navigation from "./src/components/Navigation";
import { theme } from "./src/styles/Styles";

export default function App() {
  return (
    <NativeBaseProvider theme={theme} >
      <Navigation />
    </NativeBaseProvider>
  );
}


