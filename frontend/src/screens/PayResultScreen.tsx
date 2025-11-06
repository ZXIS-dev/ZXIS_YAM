import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, type NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/StackNavigator';
import { useCart } from "../context/CartContext";
type Props = NativeStackScreenProps<RootStackParamList, 'PayResult'>;

const PaymentResultScreen: React.FC<Props> = ({route, navigation}) => {
  const {orderId, estimatedTime} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>결제가 완료되었습니다!</Text>
      <Text style={styles.text}>주문 번호: {orderId}</Text>
      <Text style={styles.text}>예상 조리 시간: {estimatedTime}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Tab')}
      >
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentResultScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 10 },
  button: {
    backgroundColor: "#004898",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: { fontSize: 16, color: "#fff" },
});
