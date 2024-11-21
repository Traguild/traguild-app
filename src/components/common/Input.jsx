import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({
  style = {},
  keyboardType = "default",
  readonly = false,
  value = "",
  onChange = () => {},
  onChangeText = () => {},
  props,
}) => {
  return (
    <View style={{ ...style }}>
      <TextInput
        style={styles.inputText}
        editable={!readonly}
        keyboardType={keyboardType}
        value={value}
        onChange={onChange}
        onChangeText={onChangeText}
      />
      {readonly ? (
        <MaterialCommunityIcons
          name="pencil-off-outline"
          size={16}
          color={theme["default-btn"]}
          style={styles.iconStyle}
        />
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    backgroundColor: theme["input-field"],
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  inputText: {
    width: "100%",
    backgroundColor: theme["input-field"],
    paddingHorizontal: 10,
    borderRadius: 15,
    padding: 15,
    color: theme["apply-text"],
    fontSize: 14,
    paddingRight: 40,
  },
  iconStyle: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -8 }],
  },
});
