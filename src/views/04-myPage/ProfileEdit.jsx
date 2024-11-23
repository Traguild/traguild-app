import { View, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";


const dummyLogin = {
  user_id: "gdhong",
  user_pw: "mypassword",
  user_name: "홍길동",
  user_nick: "RBRoad",
  user_email: "gdhong@gmail.com",
  user_region: "김해시"
};

const ProfileEdit = ({ navigation }) => {
  const toast = useToast();
  const [user_name, setName] = useState(dummyLogin.user_name);
  const [user_region, setRegion] = useState(dummyLogin.user_region);
  const [user_nick, setNick] = useState(dummyLogin.user_nick);
  const [user_email, setEmail] = useState(dummyLogin.user_email);
  const [user_pw, setPassword] = useState(dummyLogin.user_pw);
  const [new_user_pw, setNewPassword] = useState(""); // 변경할 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      headerTintColor: theme["default-btn"],
    });
  });

  const handlePostRequest = () => {
    // 비밀번호 확인 로직
    if (user_pw !== dummyLogin.user_pw) {
      toast.show("현재 비밀번호가 일치하지 않습니다.", { type: "error" });
      return;
    }

    if (user_pw == new_user_pw) {
      toast.show("현재 비밀번호와 새 비밀번호가 일치합니다.", { type: "error" });
      return;
    }

    if (new_user_pw === "") {
      toast.show("새 비밀번호를 입력해주세요.", { type: "error" });
      return;
    }

    if (new_user_pw !== confirmPassword) {
      toast.show("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.", { type: "error" });
      return;
    }

    toast.show("프로필 정보가 업데이트가 되었습니다.", { type: "success" });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="이름 " />
        <Input
          style={{ width: "65%" }}
          value={user_name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="지역 " />
        <Input
          style={{ width: "65%" }}
          value={user_region}
          onChangeText={(text) => setRegion(text)}
          placeholder="지역을 입력하세요"
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="닉네임 " />
        <Input
          style={{ width: "65%" }}
          value={user_nick}
          onChangeText={(text) => setNick(text)}
          placeholder="닉네임을 입력하세요"
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="이메일 " />
        <Input
          style={{ width: "65%" }}
          value={user_email}
          onChangeText={(text) => setEmail(text)}
          placeholder="이메일을 입력하세요"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="현재 비밀번호 " />
        <Input
          style={{ width: "65%" }}
          value={user_pw}
          onChangeText={(text) => setPassword(text)}
          placeholder="현재 비밀번호를 입력하세요"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="새 비밀번호 " />
        <Input
          style={{ width: "65%" }}
          value={new_user_pw}
          onChangeText={(text) => setNewPassword(text)}
          placeholder="새 비밀번호를 입력하세요"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="비밀번호 확인 " />
        <Input
          style={{ width: "65%" }}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="비밀번호를 다시 입력하세요"
          secureTextEntry
        />
      </View>

      <Button
        style={{ marginTop: 15 }}
        text="프로필 업데이트"
        onPress={handlePostRequest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postButton: {
    backgroundColor: theme["default-btn"],
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileEdit;