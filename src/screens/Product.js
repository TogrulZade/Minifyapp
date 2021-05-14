import React, {useState, useEffect} from 'react';

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
    FlatList,
    Dimensions,
    ImageBackground,
    Animated,
    Alert
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Navbar } from '../components/navbar'
import { STORAGE, URL, API, SIZES, COLORS, theme, FONTS } from '../constants'
import Icon from 'react-native-vector-icons/Ionicons';


const axios = require('axios').default;

export const ProductScreen = ({ route, navigation })=>{
    const { product_id } = route.params;
    const [data, setData] = useState([]);
    const [activePhotoIndex, setActivePhotoIndex] = useState(1);

    useEffect(() => {
        axios.get(API+"/product/"+product_id)
        .then(res=>{
            setData(res.data);

            // alert(JSON.stringify(res.data));
        }).catch(error=>{
            alert(error);
        })
    }, []);


    const onViewRef = React.useRef((viewableItems)=> {
        console.log(viewableItems)
        // Use viewable items in state or as intended
        // alert(JSON.stringify(viewableItems));
        viewableItems.viewableItems.map((view)=>{
            setActivePhotoIndex(view.index+1);
        })
    })

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    const zengEt = (nomre)=>{
        return(
            <View style={{position: 'absolute', bottom: 15, left: SIZES.width*0.05, zIndex: 99999999}}>
                <View>
                    <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${data[0].merchant_number}`)}} style={{backgroundColor: COLORS.primary, width: SIZES.width*0.9, padding:10, borderRadius:10, alignItems:'center' }} activeOpacity={0.8}>
                        <Text style={{color:'#fff', fontSize: 16}}> <Icon name="call" size={16} color="#fff"/> Zeng et</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const detail = (city, delivery, yeni)=>{
        return(
            <View style={{flex:1, padding: SIZES.padding, backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row', marginBottom: SIZES.padding}}>
                    <View style={{width: 100,}}><Text style={FONTS.body4}>Şəhər</Text></View>
                    <View><Text style={FONTS.body4}>{city}</Text></View>
                </View>
                <View style={{flexDirection: 'row', marginBottom: SIZES.padding}}>
                    <View style={{width: 100,}}><Text style={FONTS.body4}>Çatdırılma</Text></View>
                    <View><Text style={FONTS.body4}>{city == 0 ? 'Xeyr' : 'Bəli'}</Text></View>
                </View>
                <View style={{flexDirection: 'row',marginBottom: SIZES.padding}}>
                    <View style={{width: 100}}><Text style={FONTS.body4}>Yeni?</Text></View>
                    <View><Text style={FONTS.body4}>{yeni == 0 ? 'Xeyr' : 'Bəli'}</Text></View>
                </View>
            </View>
        );
    }

    const line = ()=>{
        return (
            <View style={{width: SIZES.width*0.9, marginLeft: SIZES.width*0.05,marginBottom: 2}}></View>
        );
    }

    return (
        <View>
            {zengEt()}
        <ScrollView>
            <View style={{flex:1}}>
            {
                    data.map((d)=>{
                        // alert(JSON.stringify(d));
                        const say_sekil = d.pictures.length;
                        return(
                            <View key={d.id}>
                                
                                    <FlatList
                                        data={d.pictures}
                                        keyExtractor={item=>item.id}
                                        horizontal
                                        pagingEnabled={true}
                                        snapToInterval={SIZES.width}
                                        snapToAlignment='start'
                                        // showsHorizontalScrollIndicator={false}
                                        scrollEventThrottle={16}
                                        decelerationRate='fast'
                                        // contentContainerStyle={{
                                        //     marginTop: SIZES.radius,
                                        // }}
                                        onViewableItemsChanged={onViewRef.current}
                                        viewabilityConfig={viewConfigRef.current}
                                        renderItem={({item, index})=>(
                                            <Animated.View key={item.id} style={{backgroundColor: '#222'}}>
                                                <ImageBackground 
                                                    source={{uri: STORAGE+item.url}}  resizeMode="cover" 
                                                    style={{
                                                        width: SIZES.width, 
                                                        height: SIZES.height*0.5, 
                                                        justifyContent: 'flex-end' 
                                                    }}>
                                                </ImageBackground>
                                            </Animated.View>
                                            )
                                        }
                                    />



                                <View style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, backgroundColor: "#333", position: 'absolute', top: SIZES.height*0.45, right:10,opacity: 0.8}}>
                                    <Text style={{color: '#fff', fontSize: 14}}>{activePhotoIndex}/{say_sekil}</Text>
                                </View>

                                <View>
                                    <View style={{padding: 10, backgroundColor: '#fff'}}>
                                    {/* <Text style={{color: "#000", fontFamily: 'Poppins-Medium', fontSize: 20, fontWeight: '600'}}>{d.product_price} AZN</Text> */}
                                    <Text style={FONTS.h2}> {d.product_price} AZN </Text>
                                        <Text style={FONTS.body2}>{d.product_name}</Text>
                                    </View>

                                    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', padding: 10}}>
                                        <View style={{borderWidth:1.2, borderColor: COLORS.primary,padding: 13, width: 120, alignItems:'center', borderRadius: 8 }}>
                                            <Text style={{color:COLORS.primary,fontWeight: '700'}}>İrəli çək</Text>
                                        </View>
                                        <View style={{borderWidth:1.2, width: 120, borderColor: COLORS.red,padding: 13, alignItems:'center',borderRadius: 8 }}>
                                            <Text style={{color:COLORS.red, fontWeight: '700'}}>VIP</Text>
                                        </View>
                                        <View style={{borderWidth:1.2, width: 120, borderColor: COLORS.purple,padding: 13, alignItems:'center',borderRadius: 8 }}>
                                            <Text style={{color:COLORS.purple, fontWeight: '700'}}>Premium</Text>
                                        </View>
                                    </View>

                                    {detail(d.city.name, d.delivery, d.new)}
                                    {line()}
                                    
                                    <View style={{padding: SIZES.padding, backgroundColor: "#fff"}}>
                                        <Text style={FONTS.body4}> {d.product_description} </Text>
                                    </View>

                                    
                                </View>
                            </View>


                        )
                    })
                }
                
            </View>
        </ScrollView>
        </View>
    )
}