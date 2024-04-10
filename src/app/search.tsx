import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FoodListItem from "../components/FoodListItem";
import { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { BarCodeScanningResult, Camera, CameraType } from "expo-camera";

const query = gql`
  query search($ingr: String, $upc: String) {
    search(ingr: $ingr, upc: $upc) {
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
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [scannerEnable, setScannerEnable] = useState(false);
  const [runSearch, { data, loading, error }] = useLazyQuery(query);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const performSearch = () => {
    runSearch({ variables: { ingr: search } });
  };
 

  if (error) {
    return <Text>Error</Text>;
  }

  const scanBarcode = (data:BarCodeScanningResult) =>{
    runSearch({ variables: { upc: data.data } });
      setScannerEnable(false);
  }

  if (scannerEnable) {
    requestPermission();
    return (
      <View>
        <Camera
          style={styles.camera}
          onBarCodeScanned={data =>scanBarcode(data)}
        />
        <AntDesign
          style={styles.btnClose}
          name="close"
          size={30}
          color="black"
          onPress={() => setScannerEnable(false)}
        />
      </View>
    );
  }

  const items = data?.search?.hints || [];
  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.search}
        />
        <Ionicons
          name="barcode-outline"
          size={35}
          color="dimgray"
          onPress={() => setScannerEnable(true)}
        />
      </View>
      {search && (
        <Pressable onPress={performSearch} style={styles.btnSearch}>
          <Text style={styles.btnTxtSearch}>Search</Text>
        </Pressable>
      )}
      {loading && <ActivityIndicator />}
      <FlatList
        data={items}
        renderItem={({ item }) => <FoodListItem food={item.food} />}
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
    flex: 1,
  },
  btnTxtSearch: {
    color: "royalblue",
    fontSize: 16,
    fontWeight: "600",
  },
  btnSearch: {
    flexDirection: "row",
    justifyContent: "center",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  btnClose: {
    position: "absolute",
    right: 10,
    height: 30,
  },
});
