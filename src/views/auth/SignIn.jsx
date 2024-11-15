import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

/* IMPORT RESOURCES */
import { theme } from "../../resources/theme/common";

const SignIn = () => {
  const Logo = require("../../../assets/splash-icon.png");

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles["app-title"]}>모험가 길드</Text>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={{ ...styles.btn, backgroundColor: "white", marginBottom: 10 }}
        >
          <Text style={styles.btnText}>가입하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.btn, backgroundColor: theme["default-btn"] }}
          onPress={() => {
            navGo.to("AppTabNavigator");
          }}
        >
          <Text style={{ ...styles.btnText, color: "white" }}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    justifyContent: "center",
    alignItems: "center",
  },

  contents: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  "app-title": {
    marginTop: 180,
    fontSize: 50,
    fontWeight: "800",
    color: "white",
  },
  logo: {
    marginTop: -50,
    width: 400,
    height: 400,
  },

  buttons: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 30,
  },
  btn: {
    borderRadius: 25,
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default SignIn;
