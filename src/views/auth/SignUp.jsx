import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";

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
      <Text style={styles.title}>회원가입</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>닉네임 :</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름 :</Text>
        <TextInput
          style={styles.input}
          value={user_name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일 :</Text>
        <TextInput
          style={styles.input}
          value={user_email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 :</Text>
        <TextInput
          style={styles.input}
          value={user_pw}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 확인 :</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>

      <Button text="가입하기" onPress={handleSignUp} />
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
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginRight: 10,
    width: 100,
    textAlign: "right",
  },
  input: {
    backgroundColor: "white",
    flex: 1,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default SignUp;
