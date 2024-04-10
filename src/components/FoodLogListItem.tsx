import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";


export type IitemLog = {
  // food_id: String,
  kcal: number,
  label: String,
  // user_id: String,
  // created_at: String,
  // id: number
  }

  
const FoodLogListItem = (item: IitemLog) => {
    return (
        <View style={styles.container}> 
          <View style={styles.listWrapper}>
            <Text style={styles.title}>{item.label}</Text>
            <Text style={styles.bodyItem}>{item.kcal} cal</Text>
          </View>
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

export default FoodLogListItem