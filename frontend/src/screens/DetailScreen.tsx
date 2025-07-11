import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { foods } from '../data/foods';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'src/navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const ToppingItem = React.memo(({ label }: { label: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <TouchableOpacity
      style={styles.checkitem}
      onPress={() => setChecked(!checked)}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      <Text style={styles.toppingLabel}>{label}</Text>
    </TouchableOpacity>
  );
});

const DetailScreen: React.FC<Props> = ({ route }) => {
  const { foodId } = route.params;
  const food = foods.find(f => f.id === foodId);
  if (!food) return null;

  const [current, setCurrent] = useState(1);
  const increase = () => setCurrent(c => c + 1);
  const decrease = () => setCurrent(c => (c > 1 ? c - 1 : 1));

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
            <ToppingItem label="김가루 추가" />
            <ToppingItem label="깨 추가" />
          </View>
        </ScrollView>

        {/* ScrollView 밖에 두어야 고정됨 */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartText}>{food.price.toLocaleString()}원 담기</Text>
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
    marginTop: 10,
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
