import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5788bd",
    borderRadius: 15,
    paddingVertical: 10,
    width: 200,
  },

  formContainer: {
    paddingTop: 50,
    flex: 1,
    padding: 10,
    backgroundColor: "#c7b6b5",
  },
  title: {
    fontSize: 20,
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderRadius: 8,
    backgroundColor: "#c4c4c4",
    padding: 8,
  },
});
