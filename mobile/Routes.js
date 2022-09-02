import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home";
import AddCanMap from "./pages/AddCan/Map";
import Info from "./pages/AddCan/Info";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCanMap"
        component={AddCanMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
