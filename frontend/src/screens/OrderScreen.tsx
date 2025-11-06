import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useOrders } from '../context/OrderContext';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/StackNavigator';
import type { TabParamList } from '../navigation/TabNavigator';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Orders'>,
  NativeStackScreenProps<RootStackParamList>
>;

// 날짜 포맷 함수 (YYYY.MM.DD)
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

const OrderScreen: React.FC<Props> = ({ navigation }) => {
  const { orders } = useOrders();

  const renderItem = ({ item }: any) => {
    const firstItem = item.items[0];
    const uniqueMenuCount = new Set(item.items.map((i: any) => i.name)).size;

    let menuText = '';
    if (uniqueMenuCount === 1) {
      menuText = `${firstItem.name} ${firstItem.quantity}개`;
    } else {
      const extraCount = item.items.length - 1;
      menuText = `${firstItem.name} 외 ${extraCount}개`;
    }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Detail', { foodId: firstItem?.id })
        }
      >
        {/* 상단: 날짜 + 주문번호 */}
        <View style={styles.headerRow}>
          <Text style={styles.time}>
            {formatDate(new Date(item.createdAt))}
          </Text>
          <Text style={styles.orderId}>주문번호: {item.orderId}</Text>
        </View>

        {/* 메뉴 요약 */}
        <Text style={styles.menu}>{menuText}</Text>

        {/* 하단: 결제 금액 + 상태 */}
        <View style={styles.footerRow}>
          <Text style={styles.price}>
            {item.totalPrice.toLocaleString()}원
          </Text>
          <View
            style={[
              styles.statusBadge,
              item.status === 'completed'
                ? styles.statusCompleted
                : styles.statusCooking,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status === 'completed' ? '조리완료' : '조리중'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <Text style={styles.empty}>주문 내역이 없습니다.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  empty: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: { fontSize: 13, color: 'black', fontWeight: 'bold' },
  time: { fontSize: 12, color: '#999' },
  menu: { fontSize: 14, color: '#333', marginBottom: 12 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusCooking: { backgroundColor: '#FFEBCC' },
  statusCompleted: { backgroundColor: '#D1F2EB' },
  statusText: { fontSize: 12, fontWeight: 'bold', color: '#333' },
});
