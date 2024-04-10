import {
  ActivityIndicator,
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
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const query = gql`
  query search($ingr: String) {
  search(ingr: $ingr) {
    text
    hints {
      food {
        label
        nutrients {
          ENERC_KCAL
        }
        foodId
      }
    }
  }
}`;

const foodItems = [
  { label: "Pizza", cal: 75, brand: "Dominos" },
  { label: "Burger", cal: 122, brand: "Burger King" },
  { label: "Chicken", cal: 253, brand: "KFC" },
];

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [runSearch, {data, loading, error}] = useLazyQuery(query, { variables: {ingr: "Chocolate"}})

  const performSearch = () => {
    runSearch({variables:{ingr: search}});
  };

  if(error){
    return (
      <Text>Error</Text>
    )
  }

  const items= data?.search?.hints || [];
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
      {loading && <ActivityIndicator />}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <FoodListItem food={item.food} />
        )}
        contentContainerStyle={{ gap: 5 }}
        ListEmptyComponent={<Text>Search a food...</Text>}
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
