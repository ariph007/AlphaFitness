import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import FoodListItem, { Iitem } from "../components/FoodListItem";
import { gql, useQuery } from "@apollo/client";
import { dateFormatter } from "../utils/dateFormatter";
import FoodLogListItem, { IitemLog } from "../components/FoodlOGListItem";

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

const query = gql`
  query foodLogsForDate($date: Date!, $user_id: String!) {
    foodLogsForDate(date: $date, user_id: $user_id) {
      food_id
      kcal
      label
      user_id
      created_at
      id
    }
  }
`;

const HomeScreen = () => {
  const user_id = "alex001";

  const {data, loading, error} = useQuery(query, {
    variables:{
      date: dateFormatter(new Date),
      user_id
    }
  })

  if(loading){
    return<ActivityIndicator />
  }

  if(error){
    return <Text>Failed to fetch data...</Text>
  }
  console.log(data);
  

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
        data={data.foodLogsForDate}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({item}) => <FoodLogListItem kcal={item.kcal} label={item.label} />}
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
    gap: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLogged: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    color: "dimgray",
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
