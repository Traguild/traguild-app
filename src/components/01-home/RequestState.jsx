import { StyleSheet, Text, View } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const RequestState = ({ text, style }) => {
  return (
    <View
      style={{
        ...style,
        ...styles.itemStateBox,
        backgroundColor:
          text === "완료" ? theme["request-done"] : theme["request-proceed"],
      }}
    >
      <Text style={styles.itemState}>{text}</Text>
    </View>
  );
};

export default RequestState;

const styles = StyleSheet.create({
  itemStateBox: {
    width: 60,
    borderRadius: 15,
    padding: 3,

    alignItems: "center",
    justifyContent: "center",
  },
  itemState: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});
