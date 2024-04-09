import { StyleSheet, Text, View } from "react-native";
import FoodListItem from "../components/FoodListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <FoodListItem label="Pizza" cal={75} brand="Dominos" />
      <FoodListItem label="Burger" cal={212} brand="Burger King" />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
    gap: 5
  },
});
