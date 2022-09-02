import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../components/Button";

import { styles } from "./styles";

import { api } from "../../services/api";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddCanInfo() {
  const route = useRoute();
  const navigation = useNavigation();

  const { coords } = route.params;

  const [canName, setCanName] = useState("");

  async function handleRegisterCan() {
    api.post("/action/insertOne", {
      collection: "trash-cans",
      database: "smart-trash",
      dataSource: "datapan",
      document: {
        name: canName,
        location: coords,
        status: "low",
      },
    });
    navigation.navigate("Home");
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Informações da lixeira</Text>
      <Text style={styles.label}>Nome da lixeira</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da lixeira"
        value={canName}
        onChangeText={setCanName}
      />
      <Button style={{ marginTop: 32 }} onPress={handleRegisterCan}>
        Registrar
      </Button>
    </View>
  );
}
