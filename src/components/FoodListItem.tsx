import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { router } from "expo-router";

export type Iitem = {
  food: {
    label: String;
    nutrients: {
      ENERC_KCAL: number;
    };
    foodId: string;
  };
};

const mutation = gql`
  mutation MyMutation(
    $food_id: String!
    $kcal: Int!
    $label: String!
    $user_id: String!
  ) {
    insertFood_log(
      food_id: $food_id
      kcal: $kcal
      label: $label
      user_id: $user_id
    ) {
      created_at
      food_id
      id
      kcal
      label
      user_id
    }
  }`;

const FoodListItem = (item: Iitem) => {
  const [logFood, {data, loading, error}] = useMutation(mutation,{
    refetchQueries: ["foodLogsForDate"]
  })

  const onPlusPress = async() =>{
    await logFood({
      variables:{
        "food_id": item.food.foodId,
        "kcal": item.food.nutrients.ENERC_KCAL,
        "label": item.food.label,
        "user_id": "alex001"
      }
    })
    router.back();
  }


  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <Text style={styles.title}>{item.food.label}</Text>
        <Text style={styles.bodyItem}>
          {item.food.nutrients.ENERC_KCAL} cal
        </Text>
      </View>
      <AntDesign name="pluscircleo" size={24} color="royalblue" onPress={onPlusPress}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f9",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listWrapper: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bodyItem: {
    color: "dimgray",
  },
});

export default FoodListItem;
