import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutLinedButton from "../UI/OutLinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../utils/database";
import FallbackText from "../UI/FallbackText";

const PlaceDetails = ({route, navigation}) => {
    const [placeDetails, setFetchedDetails] = useState()
    const selectedPlaceId = route.params.placeId
    useEffect(()=>{
      const loadPlaceData = async  () => {
        const place =  await fetchPlaceDetails(selectedPlaceId);
        setFetchedDetails(place);
        navigation.setOptions({
          title: place.title
        })
        
      }
      loadPlaceData()
      
    },[selectedPlaceId])
    const showOnMapHandler = () => {
      
      navigation.navigate('Map',{
        initialLat: placeDetails.lat,
        initialLong: placeDetails.long
      })
    };
    if(!placeDetails){
      return <FallbackText>Loading data...</FallbackText>
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: placeDetails.imageUri}}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>
        <OutLinedButton icon="map" onPress={showOnMapHandler}>
          View on map
        </OutLinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
    image:{
        height:'35%',
        minHeight:300,
        width:'100%'
    },
    locationContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    addressContainer:{
        padding:20
    },
    address:{
        color:Colors.primary500,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:16
    }
})
