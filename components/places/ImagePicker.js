import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutLinedButton from "../../UI/OutLinedButton";

const ImagePicker = () => {
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState()
    const verifyPermission = async () => {
      if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }
      if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
        Alert.alert(
          "Permission denied..!",
          "You need to grant permission to access this application."
        );
        return false;
      }
      return true;
    };
  const openCameraHandler = async () => {
    const hasPermission = await verifyPermission()
    if(!hasPermission){
        return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    }).catch(err=>console.log(err))
   image.assets && setImageUri(image?.assets[0]?.uri)
  };
  let imagePreview = <Text>Not have any image..!</Text>
  
  if(imageUri){
    imagePreview = <Image style={styles.imageContainer} source={{uri:imageUri}}></Image>
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutLinedButton icon='camera' onPress={openCameraHandler} >Take Image</OutLinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview:{
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
    }
})
