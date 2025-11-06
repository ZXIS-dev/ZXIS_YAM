import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import PayScreen from '../screens/PayScreen';
import PayResultScreen from '../screens/PayResultScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Tab: undefined;
  Detail: {foodId: string};
  Pay: undefined;
  PayResult: {orderId: string; estimatedTime: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#004898',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
      
    >
        <Stack.Screen name = "Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "Register" component={RegisterScreen} options={{title: '회원가입'}}/>
        <Stack.Screen name = "Tab" component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{title: 'YAM', headerTintColor:'white'}} />
        <Stack.Screen name="Pay" component={PayScreen} options={{title: '결제하기', headerTintColor: 'white'}}/>
        <Stack.Screen name="PayResult" component={PayResultScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}
