import React, {useState, useEffect} from 'react';
const axios = require('axios').default;
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Touchable,
    TouchableOpacity,
    Image,
    Linking,
    ScrollView,
    RefreshControl,
    FlatList
  } from 'react-native';

import {URL, STORAGE, API} from "../constants/config";
import Icon from 'react-native-vector-icons/Ionicons';
import { Navbar } from '../components/navbar';
import { FONTS, SIZES, theme } from '../constants';
  
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const IndexScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [axtarState, setAxtarState] = useState(0);
    const [axtarData, setAxtarData] = useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        axios.get(API+'/butunElanlar')
        .then(res=>{
            setData(res.data);
        }).catch(error=>{
            alert(error);
        })
        wait(1000).then(() => setRefreshing(false));
      }, []);

    useEffect(()=>{
        axios.get(API+'/butunElanlar')
        .then(res=>{
            setData(res.data);
        }).catch(error=>{
            alert(error);
        })
    },[])

    const getSearch = (search)=>{
        axios.get(API+"/axtar?q="+search)
        .then(res=>{
            setAxtarData(res.data);
            // alert(res.data.length);
            // alert(JSON.stringify(res));
        }).catch(error=>{
            alert(error);
        })
    }

    alert(JSON.stringify(data.vips));

    const vips = ()=>{
        // data.vips
    }

    const axtarModul = ()=>{
        return (
            <View style={{width:SIZES.width, height: SIZES.height,  }}>
                <View style={{padding: 10, width: SIZES.width, alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff'}}>
                    <TouchableOpacity style={{padding: 10}} onPress={()=>{setAxtarState(false)}}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={FONTS.body3}>Bütün Kateqoriyalar</Text>
                </View>
                <View style={css.searchWrap}>
                    <View style={{flex:7,}}>
                        <TextInput onChangeText={(search)=>{getSearch(search)}} onFocus={()=>{setAxtarState(1)}} placeholder="Əşya və ya xidmət axtar" placeholderTextColor="#000" style={css.searchInput}/>
                        <Icon style={{position: 'absolute', top: 20, left: 23}} name="search-outline" size={23} color="#444" />
                    </View>
                    
                    <View style={{flex:1, justifyContent: 'center',alignItems: 'center',}}>
                        <View style={{backgroundColor: "#f6f7fa", marginRight: 10, paddingVertical: 7,paddingHorizontal: 8, borderRadius: 6}}>
                            <TouchableOpacity activeOpacity={.6}>
                                <Icon size={25} name='options-outline' color='#007bff' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={axtarData}
                    numColumns={2}
                    renderItem={({item,index})=>{
                        return(
                            <View key={item.id} style={{width:SIZES.width*0.5, marginBottom: 10, padding: 10}}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('ProductScreen',{
                                product_id: item.id,
                                withAnimation: true,
                                
                            })}}>
                                <Image style={{width: "100%", height: 180, borderTopLeftRadius: 10, borderTopRightRadius: 10}} source={{uri: ''+STORAGE+item.product_cover+''}} resizeMode="cover"/>
                                <View style={{backgroundColor: '#fff', padding: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                    <Text style={FONTS.h4}>{item.product_price} AZN</Text>
                                    <Text>{item.product_name}</Text>
                                    <Text>{item.created_at}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )
                    }}
                    keyExtractor={item=>item.id}
                />
            </View> 
        );
    }
    return (
        <View style={css.container}>
            {
                axtarState ?
                axtarModul()
                :
                null
            }
            <Navbar />
            <View style={css.searchWrap}>
                <View style={{flex:7,}}>
                    <TextInput onFocus={()=>{setAxtarState(1)}} placeholder="Əşya və ya Xidmət axtarın" placeholderTextColor="#000" style={css.searchInput}/>
                    <Icon style={{position: 'absolute', top: 19, left: 23}} name="search-outline" size={23} color="#444" />
                </View>
                
                <View style={{flex:1, justifyContent: 'center',alignItems: 'center',}}>
                    <View style={{backgroundColor: "#f6f7fa", marginRight: 10, paddingVertical: 7,paddingHorizontal: 8, borderRadius: 6}}>
                        <TouchableOpacity activeOpacity={.6}>
                            <Icon size={25} name='options-outline' color='#007bff' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <ScrollView style={css.main}
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            >
                <View style={{padding: 10}}>
                    <Text>ELANLAR</Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {data.map((d,index)=>{
                        return(
                        <View key={d.id} style={{width:'49%', marginBottom: 10, padding: 10, }}>
                            <TouchableOpacity onPress={()=>{navigation.navigate('ProductScreen',{
                                product_id: d.id,
                                withAnimation: true,
                                
                            })}}>
                                <Image style={{width: "100%", height: 180, borderTopLeftRadius: 10, borderTopRightRadius: 10}} source={{uri: ''+STORAGE+d.product_cover+''}} resizeMode="cover"/>
                                <View style={{backgroundColor: '#fff', padding: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                    <Text style={FONTS.h4}>{d.product_price} AZN</Text>
                                    <Text>{d.product_name}</Text>
                                    <Text>{d.created_at}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )
                    })}
                    {/* Card */}
                </View>

                
            </ScrollView>
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
        backgroundColor: '#FFF',
        flexDirection: 'row'
    },

    searchInput:{
        backgroundColor: '#f6f7fa',
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
        // padding: 10
    }
  })