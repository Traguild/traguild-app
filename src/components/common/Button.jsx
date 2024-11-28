import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";

const Button = ({
  text,
  bgColor = theme["default-btn"],
  fontColor = "white",
  style = {},
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{ ...style, ...styles.btn, backgroundColor: bgColor }}
      {...props}
    >
      <Text style={{ ...styles.btnText, color: fontColor }}>{text}</Text>
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
});
