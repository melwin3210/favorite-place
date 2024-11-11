import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'

const FallbackText = ({children}) => {
  return (
    <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>{children}</Text>
      </View>
  )
}

export default FallbackText
const styles = StyleSheet.create({
    fallbackContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
})
