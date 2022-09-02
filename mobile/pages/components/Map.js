import { useEffect, useState } from "react";

import { StyleSheet } from "react-native";

import { getUserLocation } from "../../location/getLocation";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function Map({ children, ...props }) {
  const [latitude, setLatitude] = useState(-23.5571595);
  const [longitude, setLongitude] = useState(-46.7324227);

  useEffect(() => {
    getUserLocation().then(({ latitude, longitude }) => {
      setLongitude(longitude);
      setLatitude(latitude);
    });
  }, []);

  return (
    <MapView
      {...props}
      style={{ ...StyleSheet.absoluteFill }}
      provider={PROVIDER_GOOGLE}
      region={{
        // Change to region
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
    >
      {children}
    </MapView>
  );
}
