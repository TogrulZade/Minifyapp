import React,{ useState, useEffect } from 'react';
import { Text, View } from 'react-native'

import { firstScreen } from './src/screens/firstScreen';
import { IndexScreen } from './src/screens/IndexScreen';
import { ProductScreen } from './src/screens/Product';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const IndigatorStack = createStackNavigator();
const IndexStack = createStackNavigator();

function IndigatorScreen(){
  return(
    <IndigatorStack.Navigator>
      <IndigatorStack.Screen name="firstScreen" component={firstScreen} options={{headerShown: false}}></IndigatorStack.Screen>
    </IndigatorStack.Navigator>
  );
}



function Index(){
  return(
    <IndexStack.Navigator
    options={{
      transitionConfig: ()=> {
        return {screenInterpolator: CardStackStyleInterpolator.default.forHorizontal}
        }
    }}
    >
      <IndexStack.Screen name="IndexScreen" component={IndexScreen} options={{headerShown: false}}></IndexStack.Screen>
      <IndexStack.Screen name="ProductScreen" component={ProductScreen} options={{headerShown: false, gestureEnabled: true, transitionConfig: ()=> {
return {screenInterpolator: CardStackStyleInterpolator.default.forHorizontal}
}}}></IndexStack.Screen>
    </IndexStack.Navigator>
  );
}

export default App = (param) => {
  const [p,setP] = useState(0);

  useEffect(()=>{
    setTimeout(()=>{
      setP(1);
    },3000);
    setP(0);
  }, []);
  return(
  <NavigationContainer>
      {
        p == 0 ?
        <IndigatorScreen />
        :
          <Index />
      }
  </NavigationContainer>
  )
}