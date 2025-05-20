import { StyleSheet, Text, View } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const RequestState = ({ text, style }) => {
  const stateBg = {
    완료: theme["request-done"],
    모집: theme["request-proceed"],
    진행중: theme["request-proceed"],
    취소: theme["request-cancel"],
  };

  return (
    <View
      style={{
        ...style,
        ...styles.itemStateBox,
        backgroundColor: stateBg[text],
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
