import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../UI/IconButton";

const Map = ({ route, navigation }) => {
  const { latitude, longitude } = route.params;
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: latitude || 11.6963675,
    longitude: longitude || 75.5357418,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude: lat, longitude: long });
  };
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "Location not selected..!",
        "Please touch on screen and select the location."
      );
      return;
    }

    navigation.navigate("AddPlace", { selectedLocation });
  }, [selectedLocation, navigation]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          size={24}
          icon="save"
          onPress={savePickedLocationHandler}
        ></IconButton>
      ),
    });
  }, [savePickedLocationHandler, navigation]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker coordinate={selectedLocation} title="Picked location"></Marker>
      )}
    </MapView>
  );
};

export default Map;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
