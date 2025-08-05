// src/screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage'; //토큰 저장을 위함
import { API_DEVICE_URL } from '@env';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  
  //로그인한 사용자 확인 - 추후에 splashScreen에 넣기
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.replace('Tab');
      }
    };
    checkToken();
    console.log('API URL', API_DEVICE_URL);
    console.log('typeof env:', typeof API_DEVICE_URL); // 이건 실제로 값이 안 들어올 때 확인
  }, []);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = async() => {
    try {
      const response = await fetch(`${API_DEVICE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({id, pw}),
      });

    const data = await response.json();
    console.log('서버 응답:', data);

    if (data.success) {
      Alert.alert('로그인 성공', `${data.name}님 환영합니다!`);
      navigation.replace('Tab');
      await AsyncStorage.setItem('token', data.token); //로컬에 영구적으로 토큰 저장
      console.log('토큰: ',data.token);
    } else {
      Alert.alert('로그인 실패', data.message);
    }
    } catch (err) {
      console.error(err);
      Alert.alert('오류', '오류가 발생했습니다.');
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>YAM</Text>

      <TextInput
        placeholder="아이디"
        value={id}
        onChangeText={setId}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="비밀번호"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        textContentType="newPassword" // iOS에서 자동완성 기능을 제어
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004898',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 60,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  loginButtonText: {
    color: '#004898',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 12,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
