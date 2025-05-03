import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";

/* IMPORT RESOURCES */
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";

const Main = () => {
  const Logo = require("../../assets/splash-icon.png");

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text style={styles["app-title"]}>모험가 길드</Text>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.buttons}>
        <Button
          text="시작하기"
          style={{ marginTop: 125 }}
          onPress={() => navGo.to("Join")}
        />
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
});

export default Main;
