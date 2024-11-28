import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";

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

  const handleSignIn = () => {
    navGo.re("AppTabNavigator");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Label text="아이디 (이메일)" style={{ alignSelf: "flex-start" }} />
          <Input style={{ width: "100%" }} />
        </View>
        <View style={styles.inputContainer}>
          <Label text="비밀번호" style={{ alignSelf: "flex-start" }} />
          <Input style={{ width: "100%" }} secureTextEntry={true} />
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
