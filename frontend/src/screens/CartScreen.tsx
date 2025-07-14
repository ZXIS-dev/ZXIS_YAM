import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { useCart } from '../context/CartContext';
import { moderateScale } from 'react-native-size-matters';
import { foods } from '../data/foods';
import { NativeStackNavigationProp, type NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/StackNavigator';
import { useNavigation } from '@react-navigation/native';

const CartScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cartItems, removeFromCart, clearCart } = useCart(); // 추가된 함수 사용
  //총 금액 계산
  const totalPrice = cartItems.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#F0F0F3' }}>
      <View style={styles.header}>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>전체 삭제</Text>
          </TouchableOpacity>
        )}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyCart}>장바구니가 비어 있습니다.</Text>
        </View>
      ) : (
        <>
        <FlatList
          data={cartItems}
          keyExtractor={item =>`${item.id}-${item.toppings.slice().sort().join(',')}`}
          renderItem={({ item }) => {
            const food = foods.find(f => f.id === item.id);
            return (
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{(item.price * item.quantity).toLocaleString()}원</Text>
                  {item.toppings.length > 0 && (
                    <Text style={styles.topping}>{item.toppings.join(', ')}</Text>
                  )}
                  <Text style={styles.quantity}>수량: {item.quantity}</Text>
                </View>
                <Image source={food?.img} style={styles.image} resizeMode="contain" />
                <TouchableOpacity onPress={() => removeFromCart(item.id, item.toppings)}>
                  <Text style={styles.removeText}>삭제</Text>
                </TouchableOpacity>
              </View>
          )}}
          contentContainerStyle={{paddingBottom: moderateScale(90)}}
        />
        <View style={styles.tpContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>총금액</Text>
          <Text style={styles.totalText}>{totalPrice.toLocaleString()}원</Text>
        </View>
        <TouchableOpacity style={styles.payContainer} onPress ={() => navigation.navigate('Pay')}>
          <Text style={styles.payText}>결제하기</Text>
        </TouchableOpacity>
      </View>
       </>
      )}
       
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  emptyContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyCart:{
    fontSize:15,
    fontWeight:'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearText: {
    color: 'red',
    fontSize: 16,
  },
  item: {
    marginBottom: 20,
    padding: 20,
    borderRadius:3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    elevation: 3,
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: 'semibold',
    marginBottom: moderateScale(3),
  },
  price: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(3),
  },
  topping: {
    marginBottom: moderateScale(3),
  },
  quantity: {
    fontSize: moderateScale(15)

  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100)
  },
  removeText: {
    color: 'red',
    fontSize: 14,
  },
  tpContainer: {
    position: 'absolute',
    bottom:0,
    left:0,
    right:0,
  },
  totalContainer: {
    borderWidth:1,
    borderColor: '#C2BEBE',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    backgroundColor: 'white',
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  totalText: {
    fontWeight:'bold'
  },
  payContainer: {
    paddingVertical: moderateScale(10),
    alignItems: 'center',
    backgroundColor: '#004898'
  },
  payText: {
    color: 'white',
    fontSize: moderateScale(17),
    fontWeight: 'bold',
  }
});
