import React from 'react';
import { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootStackParamList } from '../navigation/StackNavigator';
import type { TabParamList } from '../navigation/TabNavigator';

//그리드뷰 넓이 계산
const screenWidth = Dimensions.get('window').width;
const ITEM_MARGIN = 12;
const NUM_COLUMNS = 2;
const H_PADDING = 32;
const ITEM_WIDTH = (screenWidth - H_PADDING * 2 - ITEM_MARGIN * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

//타입 지정(Compisite은 Stack, Tab 둘 다 커버 가능)
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
    /* ① 현재 선택된 레스토랑 id 보관 */
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('1');  // 초기값 '손가네'
    /* ② 선택된 레스토랑 메뉴만 필터링 */
  const filteredFoods = useMemo(
    () => foods.filter(f => f.restaurantId === selectedRestaurant),
    [selectedRestaurant],
  );

  return (
    <View style = {styles.container}>
      {/*음식점 리스트*/}
      <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          horizontal //가로 배치
          showsHorizontalScrollIndicator={false} //스크롤바 숨김
          contentContainerStyle={{ paddingHorizontal: 5 }}

          renderItem={({ item }) => {
          const active = item.id === selectedRestaurant;
          return (
            <TouchableOpacity
              style={styles.restaurantsContainer}
              onPress={() => setSelectedRestaurant(item.id)}
            >
              <Text style={[
                styles.restaurantsItem,
                { color: active ? '#004898' : 'gray' },
              ]}>
                {item.name}
              </Text>
              {active && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        }}
      />
      <FlatList
          data={filteredFoods} //필터링된 음식 배열
          keyExtractor={(item)=>item.id}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal:5,
            paddingBottom:20,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
          renderItem={({item}) => (
            <TouchableOpacity 
            style={styles.foodCard}
            //DetailScreen으로 이동, footid 넘김
            onPress={() => navigation.navigate('Detail', {foodId: item.id})}
            >
              <Image 
                source={typeof item.img==='number' ? item.img : {uri: item.img}} 
                style={styles.foodImg} />
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>{item.price.toLocaleString()}원</Text>
            </TouchableOpacity>
          )
          }
      />
    </View>
  );
}
export default HomeScreen;

  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      paddingHorizontal: 5,
      backgroundColor: '#F0F0F3',
      margin: 8,
    },
    restaurantsContainer: {
      alignItems: 'center',
    marginHorizontal: 12,
    marginTop:10,
    marginBottom: 10,
    },
    indicator: {
      marginTop:4,
      width: '100%',
      height: 2,
      backgroundColor: '#004898',
      borderRadius: 1,
    },
    restaurantsItem: {
      fontSize: 15,
    fontWeight: 'bold',
    },
    foodCard: {
      width: ITEM_WIDTH,
      borderRadius: 8,
      marginTop : 10,
      alignItems: 'center',
    },
    foodImg: {
    width: '100%',
    height: ITEM_WIDTH,
    borderRadius: 6,
  },
  foodName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  foodPrice: {
    marginTop: 2,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  });

// 더미 데이터 (추후에 DB 연동 예정)
const restaurants = [
  { id: '1', name: '손가네' },
  { id: '2', name: '홍콩반점' },
  { id: '3', name: '홍춘' },
  { id: '4', name: '고래심줄' },
  { id: '5', name: '인도네팔'}
];

const foods = [
  {
    id: 'f1',
    restaurantId: '1',
    name: '칼국수',
    price: 5500,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f2',
    restaurantId: '1',
    name: '비빔밥',
    price: 6500,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f3',
    name: '김치찌개',
    restaurantId: '1',
    price: 4500,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f4',
    name: '제육 볶음',
    restaurantId: '1',
    price: 12000,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f5',
    name: '김치찌개',
    restaurantId: '1',
    price: 4500,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f6',
    name: '제육 볶음',
    restaurantId: '1',
    price: 12000,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f7',
    restaurantId: '2',
    name: '칼국수',
    price: 5500,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f8',
    restaurantId: '2',
    name: '비빔밥',
    price: 6500,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f9',
    name: '김치찌개',
    restaurantId: '2',
    price: 4500,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f10',
    name: '제육 볶음',
    restaurantId: '2',
    price: 12000,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f11',
    name: '김치찌개',
    restaurantId: '2',
    price: 4500,
    img: require('../assets/noodle.png'),
  },
  {
    id: 'f12',
    name: '제육 볶음',
    restaurantId: '2',
    price: 12000,
    img: require('../assets/noodle.png'),
  },
];
