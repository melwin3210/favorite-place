import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutLinedButton from "../../UI/OutLinedButton";
import {useNavigation} from '@react-navigation/native'
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { getMapPreviewUrl } from "../../utils/location";

const LocationPicker = () => {
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState()
    const navigation = useNavigation()
    const verifyPermission = async () => {
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
          const permissionResponse = await requestPermission();
          return permissionResponse.granted;
        }
        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
          Alert.alert(
            "Permission denied..!",
            "You need to grant permission to access this application."
          );
          return false;
        }
        return true;
      };
    const getLocationHandler = async() =>{
        const hasPermission = await verifyPermission()
        if(!hasPermission){
            return;
        }
        const location = await getCurrentPositionAsync()
        setPickedLocation({
            lat: location.coords.latitude,
            long: location.coords.longitude
        })
        
    };
    const getPickedLocation = async() => {
        await getLocationHandler()
        
        navigation.navigate('Map', {
            latitude: pickedLocation.lat,
            longitude: pickedLocation.long,
        })
    }
  let mapPreview = <Text>No preview available..!</Text>
  
  if(pickedLocation){
    
    
    mapPreview = <Image style={styles.imageContainer} source={{uri:getMapPreviewUrl(pickedLocation.lat,pickedLocation.long)}}></Image>
  }
  return (
    <View>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.action}>
      <OutLinedButton icon='location' onPress={getLocationHandler} >Locate user</OutLinedButton>
      <OutLinedButton icon='map' onPress={getPickedLocation} >Pick on map</OutLinedButton>
      </View>
      
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    imageContainer:{
        width:'100%',
        height:'100%'
    },
    action:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    }
})
