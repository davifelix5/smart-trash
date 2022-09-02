import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { styles } from "./styles";

import Home from "./pages/Home";
import Routes from "./Routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
