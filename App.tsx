import React from "react";
import { NativeBaseProvider } from "native-base";
import UserNavigation from "./src/navigation/UserNavigation";
import { theme } from "./src/styles/Styles";
import { useAuthentication } from "./src/utils/useAuthentication";
import WelcomeScreen from "./src/screens/WelcomeScreen";


export default function App() {
  const { user } = useAuthentication();

  return (
    <NativeBaseProvider theme={theme}>
      {user ? <UserNavigation /> : <WelcomeScreen />}
    </NativeBaseProvider>
  );
}


