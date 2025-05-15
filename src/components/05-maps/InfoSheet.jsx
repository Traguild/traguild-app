import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { theme } from "resources/theme/common";
import RequestItem from "components/01-home/RequestItem";
import { API } from "config/fetch.config";

const InfoSheet = ({ location, requestData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="map-pin" size={16} color={theme["default-btn"]} />
        <Text style={styles.headerText}>{location.city}</Text>
      </View>
      <BottomSheetFlatList
        style={{ width: "100%" }}
        data={requestData}
        renderItem={({ item }) => <RequestItem item={item} />}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 65,
            }}
          >
            <MaterialIcons
              name="content-paste-off"
              size={120}
              color="lightgray"
            />
            <Text
              style={{ color: "lightgray", fontSize: 18, fontWeight: "500" }}
            >
              의뢰가 없습니다.
            </Text>
          </View>
        }
        keyExtractor={(item) => item.request_idx.toString()}
      />
    </View>
  );
};

export default InfoSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  header: {
    height: 40,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  headerText: {
    color: theme["default-btn"],
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
  },
});
