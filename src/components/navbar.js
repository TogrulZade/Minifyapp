import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native'
import { STORAGE, URL, API, SIZES, COLORS, theme, FONTS, images } from '../constants'

export const Navbar = ()=>{
    return(
        <View style={css.nav}>
            <View style={{flexDirection: 'row'}}>
                {/* <Text style={css.logo}>mini</Text><Text style={css.logoEnd}>fy</Text> */}
                {/* <Text style={FONTS.h2}>Minify</Text> */}
                <Image source={images.logo} style={{width: 120, height: 40}} resizeMode='cover'/>
            </View>
        </View>
    )
}


const css = StyleSheet.create({
    nav:{
        height: 60,
        backgroundColor: '#fee500',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
      flex:1,
    },

    logo:{
      fontSize: 20,
      marginLeft: 10,
      fontWeight: '600',
      fontFamily: 'Poppins-Bold'
    },

    logoEnd:{
      paddingVertical: 2,
      marginTop: 0,
      height: 35,
      paddingHorizontal: 10,
      borderRadius: 26,
      backgroundColor: "#000",
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      fontFamily: 'Poppins-Medium'
    },
    searchWrap:{
        height: 60,
        backgroundColor: '#f3f3f3',
        flexDirection: 'row'
    },

    searchInput:{
        backgroundColor: '#e9e9e9',
        marginLeft: 15,
        marginRight: 5,
        marginVertical: 10,
        padding: 10,
        paddingHorizontal: 35,
        color: '#000',
        borderRadius: 6,
        height: 40,
    },
    main:{
        padding: 10
    }
  })