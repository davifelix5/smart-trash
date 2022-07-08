import * as Location from "expo-location";

export async function getUserLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Localização negada");
    return;
  }

  const { coords } = await Location.getCurrentPositionAsync({});
  return coords;
}
