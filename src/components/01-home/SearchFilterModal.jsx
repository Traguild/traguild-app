import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchFilterModal = ({ filterState, visibleState }) => {
  const { filter, setFilter } = filterState;
  const { visible, setVisible } = visibleState;
  const options = [
    {
      label: "모두",
      action: () => {
        setFilter("모두");
      },
    },
    {
      label: "취미",
      action: () => {
        setFilter("취미");
      },
    },
    {
      label: "학습",
      action: () => {
        setFilter("학습");
      },
    },
    {
      label: "생활",
      action: () => {
        setFilter("생활");
      },
    },
    {
      label: "고민",
      action: () => {
        setFilter("고민");
      },
    },
    {
      label: "심부름",
      action: () => {
        setFilter("심부름");
      },
    },
    {
      label: "기타",
      action: () => {
        setFilter("기타");
      },
    },
  ];

  return (
    <Modal visible={visible} transparent={true}>
      <SafeAreaView
        style={{ flex: 1 }}
        onTouchEnd={() => {
          setVisible(false);
        }}
      >
        <View style={styles.container}>
          {options.map((op, idx) => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={idx}
              style={styles.optionList}
              onPress={op.action}
            >
              <Text
                style={
                  op.label === filter
                    ? styles.selectedOption
                    : styles.defaultOption
                }
              >
                {op.label}
              </Text>
              {op.label === filter ? (
                <FontAwesome5
                  name="feather-alt"
                  size={14}
                  color={theme["apply-text"]}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SearchFilterModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme["input-field"],
    borderRadius: 16,
    padding: 10,

    width: "32%",

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.8,
    elevation: 8,

    position: "absolute",
    top: Platform.OS === "ios" ? 102 : 62,
    left: 10,
  },

  optionList: {
    backgroundColor: theme["input-field"],
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  defaultOption: {
    width: "80%",
    fontSize: 16,
    color: "gray",
  },
  selectedOption: {
    width: "80%",
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "bold" : "500",
    color: theme["apply-text"],
  },
});
