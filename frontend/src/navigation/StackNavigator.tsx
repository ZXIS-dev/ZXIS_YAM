import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import TabNavigator from './TabNavigator';
import PayScreen from '../screens/PayScreen';

export type RootStackParamList = {
  Tab: undefined;
  Detail: {foodId: string};
  Pay: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
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
      initialRouteName='Tab'
    >
        <Stack.Screen name = "Tab" component={TabNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{title: 'YAM', headerTintColor:'white'}} />
        <Stack.Screen name="Pay" component={PayScreen} options={{title: '결제하기', headerTintColor: 'white'}}/>
    </Stack.Navigator>
  );
}
