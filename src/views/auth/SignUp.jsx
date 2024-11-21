import { View, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";

const SignUp = ({ navigation }) => {
  const [nickname, setNickname] = useState("");
  const [user_name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_pw, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleSignUp = () => {
    if (user_pw !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입이 완료되었습니다.");
    navGo.to("SignIn");
  };

  return (
    <View style={styles.container}>
      <Label style={styles.title}>회원가입</Label>

      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="닉네임 :" />
        <Input
          style={{ width: "65%" }}
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="이름 :" />
        <Input
          style={{ width: "65%" }}
          value={user_name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="이메일 :" />
        <Input
          style={{ width: "65%" }}
          value={user_email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="비밀번호 :" />
        <Input
          style={{ width: "65%" }}
          value={user_pw}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "35%", marginBottom: 15 }} text="비밀번호 확인 :" />
        <Input
          style={{ width: "65%" }}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>

      <Button
        style={{ marginTop: 15 }}
        text="가입하기"
        onPress={handleSignUp} />
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
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SignUp;
