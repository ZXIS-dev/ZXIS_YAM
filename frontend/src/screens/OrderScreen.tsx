import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootStackParamList } from '../navigation/StackNavigator';
import type { TabParamList } from '../navigation/TabNavigator';
import { API_DEVICE_URL } from '@env';

//타입 지정(Compisite은 Stack, Tab 둘 다 커버 가능)
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Orders'>,
  NativeStackScreenProps<RootStackParamList>
>;

const OrderScreen: React.FC<Props> = ({route, navigation}) => {

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const getProfile = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_DEVICE_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization' : `bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('프로필 응답: ', data);
    if (data.success) {
      setUserId(data.user.id);
      setUserName(data.user.name);
    }
  }
  const logOut = async() => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>주문내역 화면</Text>
      <TouchableOpacity style={styles.profile} onPress ={() => getProfile()} >
        <Text style = {styles.text}>프로필 보기</Text>
      </TouchableOpacity>
      <Text style={styles.text}>이름: {userName}</Text>
      <Text style={styles.text}>아이디: {userId}</Text>
      <TouchableOpacity onPress ={() => logOut()}>
        <Text style={styles.text}>로그아웃 버튼</Text>
      </TouchableOpacity>
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
  profile: {
    backgroundColor: 'yellow'
  }
});
