import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image
  } from 'react-native';
  import { images, SIZES } from "../constants"
// alert(JSON.stringify(logo));
export const firstScreen = () => {
    return (
        <View style={css.container}>
            <View style={{flexDirection: 'row'}}>
                {/* <Text style={css.logo}>mini</Text><Text style={css.logoEnd}>fy</Text> */}
                <Image source={images.logo} style={{}} resizeMode='cover'/>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: '#fee500'
    },
    logo:{
      fontSize: 48,
      fontFamily: 'Poppins-Medium'
    },
    logoEnd:{
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 6,
      backgroundColor: "#000",
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 36,
      fontFamily: 'Poppins-Medium'
    }
  })