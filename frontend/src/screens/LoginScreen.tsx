// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
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
import { dummyUsers } from '../data/userDB';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    const found = dummyUsers.find((user) => user.id === id && user.password === pw);
    if (found) {
      navigation.replace('Tab');
    } else {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

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
