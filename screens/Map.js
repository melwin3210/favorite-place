import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = ({route}) => {
    
    const { latitude, longitude } = route.params;
    
  const region = {
    latitude: latitude||11.6963675,
    longitude: longitude ||75.5357418,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return <MapView style={styles.map} initialRegion={region}></MapView>;
};

export default Map;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
