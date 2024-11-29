import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const TextField = ({ style, max = 200, ...props }) => {
  return (
    <View style={{ ...styles.inputStyle, ...style }}>
      <TextInput
        style={{ height: "100%" }}
        textAlignVertical="top"
        multiline
        maxLength={max}
        {...props}
      />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    backgroundColor: theme["input-field"],
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    borderColor: theme["default-btn"],
  },
});
