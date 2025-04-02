import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";

const Button = ({
  text,
  bgColor = theme["default-btn"],
  fontColor = "white",
  style = {},
  textStyle = {},
  type = "default",
  ...props
}) => {
  if (type === "light") {
    return (
      <TouchableOpacity
        style={{ ...styles.lightBtn, backgroundColor: bgColor, ...style }}
        activeOpacity={0.75}
        {...props}
      >
        <Text
          style={{ ...styles.lightBtnText, color: fontColor, ...textStyle }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  } else if (type == "mini") {
    return (
      <TouchableOpacity
        style={{ ...styles.miniBtn, backgroundColor: bgColor, ...style }}
        activeOpacity={0.75}
        {...props}
      >
        <Text style={{ ...styles.miniBtnText, color: fontColor, ...textStyle }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{ ...styles.btn, backgroundColor: bgColor, ...style }}
      activeOpacity={0.75}
      {...props}
    >
      <Text style={{ ...styles.btnText, color: fontColor, ...textStyle }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
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

  lightBtn: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  lightBtnText: {
    fontSize: 18,
    fontWeight: "500",
  },

  miniBtn: {
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  miniBtnText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
