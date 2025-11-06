import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext';
import { OrderProvider } from './src/context/OrderContext';
export default function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
      </CartProvider>
    </OrderProvider>
  );
}
