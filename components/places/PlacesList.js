import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import FallbackText from "../../UI/FallbackText";

const PlacesList = ({ places }) => {
  if (!places || places.length === 0) {
    return  <FallbackText>No places added yet. Please add some.</FallbackText>
  }
  return (
    <FlatList
    style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    ></FlatList>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
    fallbackContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    },
    list:{
      margin:24
    }
})
