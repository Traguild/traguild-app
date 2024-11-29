import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";
import { getContents } from "../../resources/js/common";

const ApplyList = () => {
  const [applyList, setApplyList] = useState([]);
  useLayoutEffect(() => {
    const getApplyList = async () => {
      const user_idx = await AsyncStorage.getItem("user_idx");
      const res = await API.POST({
        url: "/requestApplicant/getApply",
        data: {
          user_idx,
          page: 1,
          limit: 10,
        },
      });

      setApplyList(res);
    };
    getApplyList();
  }, []);

  const handleApprove = (idx) => {
    // const updatedList = applyList.map((item) =>
    //   item.request_idx === idx ? { ...item, status: "approved" } : item
    // );
    // setApplyList(updatedList);
  };

  const handleReject = (idx) => {
    // const updatedList = applyList.map((item) =>
    //   item.request_idx === idx ? { ...item, status: "rejected" } : item
    // );
    // setApplyList(updatedList);
  };

  const renderItem = ({ item }) => (
    <View key={item.request_idx} style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.title}>의뢰: {item.request_title}</Text>
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>
            {item?.user_nickname ?? "알 수 없음"}
          </Text>
        </View>
        <Text style={styles.applyIntro}>
          {getContents(item.applicant_intro, 25)}
        </Text>
      </View>
      {item.applicant_state === "대기" ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => handleApprove(item.request_idx)}
          >
            <Text style={styles.buttonText}>승인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleReject(item.request_idx)}
          >
            <Text style={{ ...styles.buttonText, color: "#ff7f51" }}>반려</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.statusText}>
          {item.applicant_state === "승인" ? "승인됨" : "반려됨"}
        </Text>
      )}
    </View>
  );

  return (
    <FlatList
      style={{ width: "100%" }}
      data={applyList}
      renderItem={renderItem}
      keyExtractor={(item) => item.request_idx.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text
          style={{
            alignSelf: "center",
            color: "gray",
            marginTop: 20,
          }}
        >
          지원자가 없습니다.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: theme["home-bg"],
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 0.45,
    borderColor: theme["default-border"],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitleRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 15,
  },
  applyIntro: {
    color: "gray",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  approveButton: {
    backgroundColor: "#6a994e",
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: "#ff7f51",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: theme["default-btn"],
  },
});

export default ApplyList;
