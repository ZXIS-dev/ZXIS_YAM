import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import { moderateScale } from 'react-native-size-matters';

export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {backgroundColor:'#004898', height:56},
        headerTintColor: 'white',
        headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
        tabBarActiveTintColor: '#004898',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingTop: moderateScale(3),
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
  let iconName: string;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Cart':
      iconName = 'shopping-cart';
      break;
    case 'Orders':
      iconName = 'list-alt';
      break;
    default:
      iconName = 'error';
  }
  return <Icon name={iconName} size={size} color={color} />;
}
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'YAM', tabBarLabel: '홈',}} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: '장바구니', tabBarLabel: '장바구니'}} />
      <Tab.Screen name="Orders" component={OrderScreen} options={{ title: '주문내역', tabBarLabel: '주문내역' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
