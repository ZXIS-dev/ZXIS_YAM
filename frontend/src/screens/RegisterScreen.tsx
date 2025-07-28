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
import { API_DEVICE_URL } from '@env';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [idChecked, setIdChecked] = useState(false);

  const handleSignup = async() => {
    if (!id || !pw || !name || !phone) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }
    if (!idChecked) {
      Alert.alert('아이디 확인', '아이디 중복확인을 해주세요.');
      return;
    }
    if (pw !== pwConfirm) {
      Alert.alert('비밀번호 불일치', '비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await fetch(`${API_DEVICE_URL}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, pw, name, phone}),
      });

      const data = await response.json(); //서버 응답 파싱
      if (data.success) {
        Alert.alert('회원가입 완료', data.message);
        navigation.replace('Login');
      } else {
        Alert.alert('회원가입 실패', data.message);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('오류', '오류가 발생했습니다.');
    }
  };
  const handleCheckId = async() => {

    try {
      const response = await fetch(`${API_DEVICE_URL}/checked-id`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, pw, name, phone}),
      });
      const data = await response.json();
      if (data.success) {
        if (data.exists) {
          Alert.alert('중복된 아이디', data.message);
        } else {
          Alert.alert('사용 가능', data.message);
          setIdChecked(true);
        }
      } else {
        Alert.alert('입력 오류', data.message);
      }
      
    } catch (err) {
      console.error(err);
      Alert.alert('오류', '오류가 발생했습니다.');
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>YAM</Text>

      <View style={styles.idRow}>
        <TextInput
          placeholder="아이디"
          value={id}
          onChangeText={(text) => {
            setId(text);
          }}
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.checkButton} onPress={handleCheckId}>
          <Text style={styles.checkButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="비밀번호"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="비밀번호 확인"
        value={pwConfirm}
        onChangeText={setPwConfirm}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="이름"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="전화번호"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
        <Text style={styles.registerButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

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
    color: 'white',
    marginBottom: 36,
  },
  idRow: {
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'white',
    fontSize: 16,
  },
  checkButton: {
    backgroundColor: '#004898',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',   // ← 텍스트도 가운데 정렬
    height: 50,             // ← 아이디 입력창과 동일한 높이로 설정
    borderRadius: 8,
    elevation: 15,
  },
  checkButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#004898',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 12,
    elevation: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
