import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useLayoutEffect } from "react";

// IMPORT RESOURCES
import { FontAwesome5 } from "@expo/vector-icons";

import { theme } from "resources/theme/common";

const CREDIT_OPTIONS = [
  { id: "10", credits: 10, price: 1000 },
  { id: "30", credits: 30, price: 1000 * 3 },
  { id: "50", credits: 50, price: 1000 * 5 },
  { id: "100", credits: 110, price: 1000 * 10 },
  { id: "300", credits: 350, price: 1000 * 30 },
];

const SelectCredit = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitle: "충전하기",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: theme["default-btn"],
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.optionButton}
      onPress={() => {
        navGo.to("Payments", { item });
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <FontAwesome5 name="coins" size={20} color="#EBD24E" />
        <Text style={[styles.creditsText, { marginLeft: 12 }]}>
          코인 {item.credits}개
        </Text>
      </View>
      <Text style={styles.priceText}>{item.price.toLocaleString()}원</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CREDIT_OPTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default SelectCredit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopWidth: 0.4,
    borderTopColor: theme["default-border"],
    paddingHorizontal: 24,
  },
  listContainer: {
    paddingVertical: 24,
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme["btn-floating"],
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 12,
  },
  creditsText: {
    fontSize: 18,
    color: "white",
  },
  priceText: {
    fontSize: 18,
    color: "white",
  },
});
