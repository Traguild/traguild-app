import { StyleSheet, Text, View } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const Label = ({ text, style, ...props }) => {
  return (
    <View style={{ ...styles.menuName, ...style }}>
      <Text style={styles.applyMenu} {...props}>
        {text}
      </Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  menuName: {
    padding: 10,
  },
  applyMenu: {
    color: theme["apply-text"],
    fontSize: 18,
    fontWeight: "600",
  },
});
