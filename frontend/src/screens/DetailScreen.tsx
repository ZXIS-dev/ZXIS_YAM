import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { foods } from '../data/foods';
import { NativeStackNavigationProp, type NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/StackNavigator';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

type ToppingItemProps = {
  label : string;
  checked: boolean;
  onToggle: () => void;
};
//토핑 체크박스 UI
const ToppingItem = React.memo(({ label, checked, onToggle }: ToppingItemProps) => {
  return (
    <TouchableOpacity
      style={styles.checkitem}
      onPress={onToggle}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.toppingLabel}>{label}</Text>
    </TouchableOpacity>
  );
});


const DetailScreen: React.FC<Props> = ({ route }) => {
  //Id에 따라 음식 데이터 받아오기
  const { foodId } = route.params;
  const food = foods.find(f => f.id === foodId);
  if (!food) return null;
  //네비게이트
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  //배열에 선택한 토핑 저장
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const toggleTopping = (label: string) => {
    setSelectedToppings(prev =>
      //배열에 이미 있으면 제거, 없으면 추가
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };
  //수량 in/decrease
  const [current, setCurrent] = useState(1);
  const increase = () => setCurrent(c => c + 1);
  const decrease = () => setCurrent(c => (c > 1 ? c - 1 : 1));

  //Context 훅 사용해서 함수 가져오기
  const {addToCart} = useCart(); 
  //담기 버튼 데이터 수집
  const handleAddToCart=() => {
    const cartItem = {
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: current,
      toppings: selectedToppings,
    };
    addToCart(cartItem);//전역 상태에 저장
    //약간의 딜레이 후 알람
    setTimeout(() => {
      Alert.alert(
        '장바구니에 담겼습니다!',
        '', //메시지
        [{
          text: '확인',
          onPress: () => navigation.navigate('Tab'),
        },]
      ); 
    }, 200);

    console.log('장바구니로 넘길 데이터:', cartItem); //디버깅용
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image source={food.img} style={styles.image} resizeMode="cover" />

          <View style={styles.textContainer}>
            <Text style={styles.name}>{food.name}</Text>
            <Text style={styles.price}>{food.price.toLocaleString()}원</Text>

            <View style={styles.countContainer}>
              <Text style={styles.label}>수량</Text>
              <View style={styles.counter}>
                <TouchableOpacity onPress={decrease} style={styles.btn}>
                  <Text style={styles.btnTextm}>-</Text>
                </TouchableOpacity>
                <Text style={styles.count}>{current}</Text>
                <TouchableOpacity onPress={increase} style={styles.btn}>
                  <Text style={styles.btnTextp}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.toppingContainer}>
            <Text style={styles.toppingText}>토핑 추가</Text>
            {/* 추후 데이터 연동 시 동적 할당으로 수정 예정*/}
            <ToppingItem 
              label="김가루 추가" 
              checked={selectedToppings.includes('김가루 추가')} //checked는 체크표시 할지말지 결정
              onToggle={() => toggleTopping('김가루 추가')}
            />
            <ToppingItem 
              label="깨 추가" 
              checked={selectedToppings.includes('깨 추가')}
              onToggle={() => toggleTopping('깨 추가')}
            />
          </View>
        </ScrollView>

        {/* ScrollView 밖에 두어야 고정됨 */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartText}>{(food.price * current).toLocaleString()}원 담기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const SIZE30 = moderateScale(30);
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  countContainer: {
    width: moderateScale(330),
    marginTop: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  label: {
    paddingLeft: moderateScale(10),
    fontSize: moderateScale(13),
    fontWeight: 'bold',
  },
  counter: {
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginHorizontal: moderateScale(15),
    width: SIZE30,
    height: SIZE30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextm: {
    fontSize: moderateScale(30),
    lineHeight: moderateScale(30),
    marginRight: moderateScale(20),
    textAlign: 'center',
  },
  btnTextp: {
    fontSize: moderateScale(20),
  },
  count: {
    fontSize: moderateScale(20),
    marginRight: moderateScale(10),
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%',
    marginVertical: moderateScale(40),
  },
  toppingContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  toppingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
  },
  checkitem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: 'white',
  },
  checkmark: {
    color: 'black',
    fontSize: 16,
  },
  toppingLabel: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#2C64C6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  cartButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
