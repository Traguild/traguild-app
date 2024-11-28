import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

/* IMPORT RESOURCES */
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import Input from "components/common/Input";
import Label from "components/common/Label";

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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Label text="이메일" style={{ alignSelf: "flex-start" }} />
        <Input style={{ width: "100%" }} />
      </View>
      <View style={styles.inputContainer}>
        <Label text="비밀번호" style={{ alignSelf: "flex-start" }} />
        <Input style={{ width: "100%" }} />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    // justifyContent: "flex-start",
    paddingHorizontal: 35,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});
