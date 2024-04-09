import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";

type Iitem = {
    label: string,
    cal: number,
    brand: string
  }

const FoodListItem = ({label, cal, brand}: Iitem) => {
    return (
        <View style={styles.container}> 
          <View style={styles.listWrapper}>
            <Text style={styles.title}>{label}</Text>
            <Text style={styles.bodyItem}>{cal} cal, {brand}</Text>
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