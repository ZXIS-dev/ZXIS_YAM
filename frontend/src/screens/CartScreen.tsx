import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart } = useCart(); // 추가된 함수 사용

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.header}>
        <Text style={styles.title}>장바구니</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>전체 삭제</Text>
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        <Text style={{ fontSize: 16, marginTop: 20 }}>장바구니가 비어 있습니다.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item =>`${item.id}-${item.toppings.slice().sort().join(',')}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>수량: {item.quantity}</Text>
                <Text>가격: {item.price * item.quantity}원</Text>
                {item.toppings.length > 0 && (
                  <Text>토핑: {item.toppings.join(', ')}</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id, item.toppings)}>
                <Text style={styles.removeText}>삭제</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearText: {
    color: 'red',
    fontSize: 16,
  },
  item: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeText: {
    color: 'red',
    fontSize: 14,
  },
});
