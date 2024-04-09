import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FoodListItem from "../components/FoodListItem";
import { useState } from "react";

const foodItems = [
  { label: "Pizza", cal: 75, brand: "Dominos" },
  { label: "Burger", cal: 122, brand: "Burger King" },
  { label: "Chicken", cal: 253, brand: "KFC" },
];

export default function App() {
  const [search, setSearch] = useState("");

  const performSearch = () => {
    console.warn("Search :" + search);
    setSearch("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.search}
      />
      {search && (
        <Pressable onPress={performSearch} style={styles.btnSearch}>
          <Text style={styles.btnTxtSearch}>Search</Text>
        </Pressable>
      )}
      <FlatList
        data={foodItems}
        renderItem={({ item }) => (
          <FoodListItem label={item.label} cal={item.cal} brand={item.brand} />
        )}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
  },
  search: {
    backgroundColor: "gainsboro",
    padding: 10,
    borderRadius: 20,
  },
  btnTxtSearch: {
    color: "royalblue",
    fontSize: 16,
    fontWeight: "600"
  },
  btnSearch:{
    flexDirection: "row",
    justifyContent: "center"
  }
});
