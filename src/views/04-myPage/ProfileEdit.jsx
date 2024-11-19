import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const dummyLogin = {
  "user_id": "gdhong",
  "user_pw": "mypassword",
  "user_name": "홍길동",
  "user_nick": "RBRoad",
  "user_email": "gdhong@gmail.com",
  "user_birth": "1900-01-01",
  "user_region": "김해시"
};

const ProfileEdit = () => {
  // 각 필드에 대한 상태 관리
  const [region, setRegion] = useState(dummyLogin.user_region);
  const [nick, setNick] = useState(dummyLogin.user_nick);
  const [email, setEmail] = useState(dummyLogin.user_email);
  const [password, setPassword] = useState(dummyLogin.user_pw);

  const handlePostRequest = () => {
    //업데이트 로직 필요
    Alert.alert(
      "프로필 업데이트",
      "프로필 정보가 업데이트되었습니다!",
      [{ text: "확인", onPress: () => navGo.back() }], { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput style={styles.readOnlyText} editable={false}>{dummyLogin.user_name}</TextInput>

        <Text style={styles.label}>지역</Text>
        {/* 드롭다운으로 변경해야되는데 직접 만들던지 라이브러리 추가하던지 해야됨 */}
        <TextInput
          style={styles.input}
          value={region}
          onChangeText={setRegion}
          placeholder="지역을 입력하세요"
        />

        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.input}
          value={nick}
          onChangeText={setNick}
          placeholder="닉네임을 입력하세요"
        />

        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력하세요"
          keyboardType="email-address"
        />

        <Text style={styles.label}>비밀번호 수정</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
        />
      </View>

      {/* 하단 버튼 */}
      <TouchableOpacity style={styles.postButton} onPress={handlePostRequest}>
        <Text style={styles.postButtonText}>프로필 업데이트</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    padding: 20,
    justifyContent: 'space-between', // 상단과 하단에 공간 분배
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center', // 폼이 화면 중앙에 위치하도록 설정
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#333",
  },
  readOnlyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f0f0f0", // 읽기 전용 텍스트 배경색
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff", // 입력 필드 배경색
  },

  postButton: {
    // backgroundColor: theme['btn-primary'], // 테마에서 기본 버튼 색상
    backgroundColor: 'green',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileEdit;