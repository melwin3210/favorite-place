import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../constants/colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../../UI/Button'
import { useNavigation } from '@react-navigation/native'
import { Place } from '../../models/place'

const PlaceForm = () => {

    const [enteredTitle, setEnteredTitle]=useState('')
    const [imageUri, setImageUri]=useState('')
    const [location, setLocation]=useState('');
    const navigation = useNavigation()
    const changeTitlteHandler = (enteredText) => setEnteredTitle(enteredText);
    const imageUriHandler = (uri) => setImageUri(uri)
    const locationHandler = useCallback((location) => setLocation(location),[])
    const addPlaceHandler = () => {
        const placeDetails = new Place(enteredTitle,imageUri,location)
        
        navigation.navigate('AllPlaces',{
            places: placeDetails
        })
    }
  return (
    <ScrollView style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitlteHandler} value={enteredTitle} />
        <ImagePicker setImage={imageUriHandler}/>
        <LocationPicker setLocation={locationHandler} />
        <Button onpress={addPlaceHandler} >Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form:{
        flex:1,
        padding:24

    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color: Colors.primary500
    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth:2,
        backgroundColor: Colors.primary100
    }
})
