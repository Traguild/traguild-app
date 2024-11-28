import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

/* IMPORT RESOURCES */
import { theme } from "resources/theme/common";

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

  const handleSignIn = async () => {
    const res = await API.POST({
      url: "/login",
      data: { user_id, user_pw },
    });

    if (res) {
      res.user_idx != -1 ? navGo.re("AppTabNavigator") : null;
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
