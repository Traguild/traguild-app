import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { isEmail } from "resources/js/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";

const SignUp = ({ navigation }) => {
  const toast = useToast();
  const [user_name, setName] = useState("");
  const [user_region, setUserRegion] = useState("");
  const [user_nickname, setUserNickname] = useState("");
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
      headerTintColor: theme["default-btn"],
    });
  });

  const handleSignUp = async () => {
    res = await API.PUT({
      url: "/auth/signUp",
      data: {
        user_name,
        user_region,
        user_id: user_email,
        user_email,
        user_pw,
        user_nickname,
        user_birth: Date.now().toISOString(),
      },
    });

    /*if (!isEmail(user_email)) {
      toast.show("유효하지 않은 이메일 형식입니다.");
      return;
    }*/
    if (user_pw !== confirmPassword) {
      toast.show("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (res) {
      toast.show(`${user_nickname}님 환영합니다!`);
      navGo.re("AppTabNavigator");
    } else {
      toast.show("다시 시도해주세요.");
    }
    console.log("회원가입 응답:", res);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView style={{ backgroundColor: theme["default-bg"] }}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="이름" />
            <Input
              style={{ width: "100%" }}
              value={user_name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="지역" />
            <Input
              style={{ width: "100%" }}
              value={user_region}
              onChangeText={(text) => setUserRegion(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="닉네임 " />
            <Input
              style={{ width: "100%" }}
              value={user_nickname}
              onChangeText={(text) => setUserNickname(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="이메일 " />
            <Input
              style={{ width: "100%" }}
              value={user_email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="비밀번호 " />
            <Input
              style={{ width: "100%" }}
              value={user_pw}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="비밀번호 확인 " />
            <Input
              style={{ width: "100%" }}
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
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    paddingHorizontal: 35,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});

export default SignUp;
