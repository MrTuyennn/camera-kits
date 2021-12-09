import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTE_KEY} from './src/config/constains';
import MainScreen from './src/screens/MainScreen';
import CameraKit from './src/screens/CameraKit';
import ScrollCamera from './src/screens/ScrollCamera';
import QRCodeScreen from './src/screens/QRCodeScreen';
interface Props {}

const Stack = createStackNavigator();
const App = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={ROUTE_KEY.MainScreen}>
        <Stack.Screen name={ROUTE_KEY.MainScreen} component={MainScreen} />
        <Stack.Screen name={ROUTE_KEY.CameraKit} component={CameraKit} />
        <Stack.Screen name={ROUTE_KEY.ScrollCamera} component={ScrollCamera} />
        <Stack.Screen name={ROUTE_KEY.QRCodeScreen} component={QRCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
