import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { Ionicons } from "react-native-vector-icons";

const MyItem = ({ text, onPress }) => {
  const icons = {
    "찜한 의뢰": "heart",
    "의뢰 내역": "receipt-outline",
    "프로필 수정": "person-circle-outline",
  };

  return (
    <TouchableOpacity style={{ alignItems: "center" }} activeOpacity={0.3} onPress={onPress}>
      <Ionicons
        name={icons[text]}
        size={34}
        color={theme["default-btn"]}
        style={{ marginBottom: 3 }}
      />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default MyItem;
