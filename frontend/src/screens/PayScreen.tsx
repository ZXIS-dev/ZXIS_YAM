import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView} from 'react-native';
import { useCart } from '../context/CartContext';
import { moderateScale } from 'react-native-size-matters';
import { NativeStackNavigationProp, type NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/StackNavigator';
import { useOrders } from '../context/OrderContext';
type Props = NativeStackScreenProps<RootStackParamList, 'Pay'>;
type PaymentMethod = '신용/체크카드' | '카카오페이' | '토스페이';

const paymentMethods: PaymentMethod[] = ['신용/체크카드', '카카오페이', '토스페이'];

const PayScreen: React.FC<Props> = ({navigation}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('신용/체크카드');
  const {cartItems, clearCart} = useCart();
  const {addOrder} = useOrders();
  const handlePayment = () => {
    const orderId = Math.floor(Math.random() * (1000-500 + 1)) + 500;
    
    addOrder({
      orderId: orderId.toString(),
      items: cartItems,
      totalPrice,
      paymentMethod: selectedMethod,
      createdAt: new Date()
    });
    navigation.navigate('PayResult', {
      orderId: orderId.toString(),
      estimatedTime: '5분',
    });
    clearCart();
  };

const totalPrice = cartItems.reduce((sum, item) => {
   return sum + item.price * item.quantity;
}, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: moderateScale(90)}}>
      <Text style={styles.summaryText}>주문 정보</Text>
      <FlatList
        data = {cartItems}
        scrollEnabled={false}
        keyExtractor={item =>`${item.id}-${item.toppings.slice().sort().join(',')}`}
        renderItem={({item}) => {
        return (
          <View style={styles.summaryBox}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{(item.price * item.quantity).toLocaleString()}원</Text>
              {item.toppings.length>0 && 
              (<Text style={styles.toppings}>{item.toppings.join(', ')}</Text>)}
              <Text>수량: {item.quantity}개</Text>
          </View>
        )}}
      />

      {/* 결제 수단 선택 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>결제 수단 선택</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.paymentOption,
              selectedMethod === method && styles.selectedOption,
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <Text 
            style={[styles.optionText,
            selectedMethod === method && styles.selectedText
            ]}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>

      {/* 총 금액 및 버튼 */}
      <View style={styles.footer}>
        <Text style={styles.totalAmount}>총 결제 금액: {totalPrice.toLocaleString()}원</Text>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>결제하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F0F3',
  },
  summaryText:{
    fontWeight: 'bold',
    fontSize : moderateScale(15),
    paddingBottom: moderateScale(20),
  },  
  summaryBox: {
    justifyContent: 'flex-start',
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth:1,
    backgroundColor: 'white',
  },
  name: {
    fontSize: moderateScale(13)
  },
  price: {
    fontWeight:'bold',
    marginBottom: moderateScale(5)
  },
  toppings: {
    fontSize: moderateScale(11),
    marginBottom: moderateScale(3)
  },

  section: {
    marginVertical: moderateScale(20)
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentOption: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    backgroundColor:'white'
  },
  selectedOption: {
    borderColor: '#007bff',
    backgroundColor: '#6896F9',
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    color: 'white'
  },
  footer: {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'white',
    marginTop: moderateScale(10),
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingTop:moderateScale(10),
    paddingLeft: moderateScale(20)
  },
  payButton: {
    backgroundColor: '#004898',
    padding: 14,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
