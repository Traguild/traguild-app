import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";

const SignUp = ({ navigation }) => {
  const toast = useToast();
  const [user_nickname, setUserNickname] = useState("");
  const [user_name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_pw, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "",
      headerStyle: {
        backgroundColor: theme["default-bg"],
        elevation: 0,
        shadowOpacity: 0,
      },
    });
  });

  const handleSignUp = async () => {
    if (user_pw !== confirmPassword) {
      toast.show("비밀번호가 일치하지 않습니다.");
      return;
    }

    res = await API.PUT({
      url: "/userInfo",
      data: {
        user_id: user_email,
        user_email,
        user_pw,
        user_name,
        user_nickname,
        user_birth: Date.now(),
      },
    });

    if (res) {
      toast.show("회원가입이 완료되었습니다.");
      navGo.to("SignIn");
    } else {
      toast.show("다시 시도해주세요.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Label style={{ width: "35%", marginBottom: 15 }} text="닉네임 " />
          <Input
            style={{ width: "65%" }}
            value={user_nickname}
            onChangeText={(text) => setUserNickname(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label style={{ width: "35%", marginBottom: 15 }} text="이름 " />
          <Input
            style={{ width: "65%" }}
            value={user_name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label style={{ width: "35%", marginBottom: 15 }} text="이메일 " />
          <Input
            style={{ width: "65%" }}
            value={user_email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Label style={{ width: "35%", marginBottom: 15 }} text="비밀번호 " />
          <Input
            style={{ width: "65%" }}
            value={user_pw}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label
            style={{ width: "35%", marginBottom: 15 }}
            text="비밀번호 확인 "
          />
          <Input
            style={{ width: "65%" }}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <Button
          style={{ marginTop: 15 }}
          text="가입하기"
          onPress={handleSignUp}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: theme["apply-title"],
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SignUp;
