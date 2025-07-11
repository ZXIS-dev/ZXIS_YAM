import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartScreen: React.FC=()=> {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>장바구니 화면</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
