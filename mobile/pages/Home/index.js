import { useCallback, useState } from "react";

import { View, Text } from "react-native";

import { Marker, Callout } from "react-native-maps";
import { Circle } from "react-native-progress";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles";

import { api } from "../../services/api";

import trashEmpty from "../../images/trash-free.png";
import trashFull from "../../images/trash-full.png";
import trashWarning from "../../images/trash-warning.png";

import Map from "../components/Map";
import Button from "../components/Button";

import getRoute from "../../location/getRoute";

const images = {
  low: trashEmpty,
  high: trashFull,
  medium: trashWarning,
};

const colors = {
  low: "#78BC67",
  high: "#FB7070",
  medium: "#F8FB88",
};

export default function Home() {
  const [cans, setCans] = useState([]);

  const navigation = useNavigation();

  async function getCans() {
    try {
      const { data } = await api.post("action/find", {
        collection: "trash-cans",
        database: "smart-trash",
        dataSource: "datapan",
      });

      const { documents: trashCans } = data;

      setCans(trashCans);
    } catch (err) {
      setCans([]);
      console.log("Houve um erro: " + err);
    }
  }

  async function handleGenerateRoute() {
    getRoute();
  }

  useFocusEffect(
    useCallback(() => {
      getCans();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Map>
        {cans.map((can) => {
          return (
            <Marker
              key={can._id}
              icon={images[can.status]}
              calloutAnchor={{
                x: 2.7,
                y: -0.1,
              }}
              anchor={{ x: -0.1, y: 1 }}
              coordinate={{
                latitude: can.location.latitude,
                longitude: can.location.longitude,
              }}
            >
              <Callout tooltip>
                <View style={styles.callout}>
                  <Text style={styles.calloutText}>Lixeira "{can.name}"</Text>
                  <Circle
                    animated={false}
                    showsText={true}
                    textStyle={{ fontSize: 16 }}
                    color={colors[can.status]}
                    size={45}
                    progress={can.level}
                  />
                </View>
              </Callout>
            </Marker>
          );
        })}
      </Map>
      <View style={styles.buttonContainer}>
        <Button onPress={handleGenerateRoute} style={{ marginBottom: 10 }}>
          Gerar rota
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate("AddCanMap")}
        >
          Adicionar lixeira
        </Button>
        <Button onPress={getCans}>Atualizar</Button>
      </View>
    </View>
  );
}
