import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect.bind(this, place.id)} style={({pressed})=>[styles.item, pressed && styles.pressed]}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.text}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 4,
    backgroundColor: Colors.primary500,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
    marginTop:2
  },
  pressed: {
    opacity: 0.9,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
  image: {
    flex: 1,
    height: 100,
    margin:4,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  info: {
    flex: 2,
    padding:12
  },
});
