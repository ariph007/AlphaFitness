import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import FoodListItem, { Iitem } from "../components/FoodListItem";

const foodItems: Iitem[] = [
  {
    food: {
      foodId: "123",
      label: "Pizza",
      nutrients: {
        ENERC_KCAL: 75,
      },
    },
  },
  {
    food: {
      foodId: "124",
      label: "Burger",
      nutrients: {
        ENERC_KCAL: 125,
      },
    },
  },
  {
    food: {
      foodId: "125",
      label: "Chicken",
      nutrients: {
        ENERC_KCAL: 213,
      },
    },
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.headerLogged}>Calories</Text>
        <Text>1770 - 360 = 1623</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.headerLogged}>Today logged food</Text>
        <Link href="/search" asChild>
          <Pressable style={styles.btnAddFood}>
            <Text style={styles.btnTxtAddFood}>ADD FOOD</Text>
          </Pressable>
        </Link>
      </View>
      <FlatList
        data={foodItems}
        contentContainerStyle={{gap:5}}
        renderItem={({ item }) => <FoodListItem food={item.food} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    gap: 10
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLogged: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    color: "dimgray"
  },
  btnTxtAddFood: {
    color: "royalblue",
    fontSize: 16,
    fontWeight: "600",
  },
  btnAddFood: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
