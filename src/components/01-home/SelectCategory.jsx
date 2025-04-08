import {
  Animated,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";

const SelectCategory = ({ categoryState, visibleState }) => {
  const [request_category, setCategory] = categoryState;
  const [visible, setVisible] = visibleState;

  const options = [
    {
      label: "취미",
      action: () => {
        setCategory("취미");
      },
    },
    {
      label: "학습",
      action: () => {
        setCategory("학습");
      },
    },
    {
      label: "생활",
      action: () => {
        setCategory("생활");
      },
    },
    {
      label: "고민",
      action: () => {
        setCategory("고민");
      },
    },
    {
      label: "심부름",
      action: () => {
        setCategory("심부름");
      },
    },
    {
      label: "기타",
      action: () => {
        setCategory("기타");
      },
    },
  ];

  return (
    <Modal visible={visible} transparent={true}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onTouchEnd={() => {
          setVisible(false);
        }}
      >
        <View style={[styles.container]}>
          {options.map((op, idx) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={idx}
              style={styles.optionList}
              onPress={op.action}
            >
              <Text
                style={
                  op.label === request_category
                    ? styles.selectedOption
                    : styles.defaultOption
                }
              >
                {op.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",

    alignItems: "center",
    backgroundColor: theme["input-field"],
    borderRadius: 20,
    padding: 10,

    width: "70%",

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.8,
    elevation: 8,
  },

  optionList: {
    backgroundColor: theme["input-field"],
    paddingVertical: 20,
    width: "33.33%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultOption: {
    textAlign: "center",
    width: "100%",
    fontSize: 16,
    color: "gray",
  },
  selectedOption: {
    textAlign: "center",
    width: "100%",
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "bold" : "600",
    color: theme["apply-text"],
  },
});
