import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>주문내역 화면</Text>
    </View>
  );
};

export default OrderScreen;

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
