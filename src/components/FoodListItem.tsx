import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";

export type Iitem = {
  food: {
    label: String,
    nutrients: {
      "ENERC_KCAL": number
    },
    foodId: string
  }
  }

const FoodListItem = (item: Iitem) => {
    return (
        <View style={styles.container}> 
          <View style={styles.listWrapper}>
            <Text style={styles.title}>{item.food.label}</Text>
            <Text style={styles.bodyItem}>{item.food.nutrients.ENERC_KCAL} cal</Text>
          </View>
          <AntDesign name="pluscircleo" size={24} color="royalblue" />
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f6f6f9",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    listWrapper: {
        flex: 1, gap:5
    },
    title:{
        fontWeight: "bold", fontSize:16
    },
    bodyItem:{
        color: "dimgray"
    }
})

export default FoodListItem