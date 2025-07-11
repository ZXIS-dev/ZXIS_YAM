import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';

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
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size, focused }) => {
  let iconName: string;

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'ios-home'  : 'ios-home-outline';
      break;
    case 'Cart':
      iconName = focused ? 'ios-cart'  : 'ios-cart-outline';
      break;
    case 'Orders':
      iconName = focused ? 'ios-list'  : 'ios-list-outline';
      break;
    default:
      iconName = 'alert';        // 안전용 - 항상 값 할당
  }
  return <Ionicons name={iconName} size={size} color={color} />;
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
