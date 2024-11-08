import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

const PlaceItem = ({place, onSelect}) => {
  return (
    <Pressable onPress={onSelect}>
        <Image source={{uri:place.imageUrl}} />
        <View>
            <Text>{place.title}</Text>
            <Text>{place.address}</Text>
        </View>
    </Pressable>
  )
}

export default PlaceItem;

const styles = StyleSheet.create({
    
})
