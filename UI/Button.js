import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { Colors } from '../constants/colors';

const Button = ({onpress, children}) => {
  return (
    <Pressable style={({pressed})=> [styles.button, pressed && styles.pressed]} onPress={onpress} >
        <Text style={styles.text}>
         {children}
        </Text>
    </Pressable>
  )
}

export default Button;

const styles = StyleSheet.create({
    button:{
        paddingHorizontal:12,
        paddingVertical:8,
        margin:4,
        backgroundColor: Colors.primary500,
        elevation:4,
        shadowColor:'black',
        shadowOpacity:0.15,
        shadowOffset:{width:1, height:1},
        shadowRadius:2,
        borderRadius:4

    },
    pressed:{
        opacity:0.7
    },
    text:{
        fontSize:16,
        textAlign:'center',
        color: Colors.primary50
    }
})
