import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

/* IMPORT RESOURCES */
import { theme } from "resources/theme/common";
import { getEmail } from "resources/js/common";

// IMPORT COMPONENTS
import Input from "components/common/Input";
import Label from "components/common/Label";
import Button from "components/common/Button";

const SignIn = ({ navigation }) => {
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

  const [user_id, setUserId] = useState("");
  const [user_pw, setUserPw] = useState("");
  const toast = useToast();

  const handleSignIn = async () => {
    if (!getEmail(user_id)) {
      toast.show("유효하지 않은 이메일 형식입니다.", "올바른 이메일 주소를 입력해주세요.");
      return;
    }
    const res = await API.POST({
      url: "/login",
      data: { user_id, user_pw },
    });

    if (res) {
      if (res.user_idx != -1) {
        await AsyncStorage.setItem("user_idx", res.user_idx.toString());
        navGo.re("AppTabNavigator");
      } else {
      }
    } else {
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Label text="아이디 (이메일)" style={{ alignSelf: "flex-start" }} />
          <Input
            style={{ width: "100%" }}
            value={user_id}
            onChangeText={setUserId}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label text="비밀번호" style={{ alignSelf: "flex-start" }} />
          <Input
            style={{ width: "100%" }}
            value={user_pw}
            onChangeText={setUserPw}
            secureTextEntry={true}
          />
        </View>
        <Button
          text="계속하기"
          style={{ marginTop: 15 }}
          onPress={handleSignIn}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

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
