import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext';
export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
          <StackNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}
