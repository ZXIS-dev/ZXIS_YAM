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

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [idChecked, setIdChecked] = useState(false);

  const handleCheckId = () => {
    const exists = dummyUsers.find((user) => user.id === id);
    if (exists) {
      Alert.alert('중복된 아이디', '이미 존재하는 아이디입니다.');
      setIdChecked(false);
    } else if (!id.trim()) {
      Alert.alert('입력 오류', '아이디를 입력해주세요.');
      setIdChecked(false);
    } else {
      Alert.alert('사용 가능', '사용할 수 있는 아이디입니다.');
      setIdChecked(true);
    }
  };

  const handleRegister = () => {
    if (!id || !pw || !pwConfirm || !name || !phone) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }

    if (!idChecked) {
      Alert.alert('아이디 확인', '아이디 중복 확인을 해주세요.');
      return;
    }

    if (pw !== pwConfirm) {
      Alert.alert('비밀번호 불일치', '비밀번호가 일치하지 않습니다.');
      return;
    }

    dummyUsers.push({ id, password: pw }); // 이름, 전화번호는 구조 확장 시 저장 가능
    Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다.');
    navigation.replace('Login');
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
            setIdChecked(false);
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

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
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
