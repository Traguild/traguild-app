import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import RequestItem from "components/01-home/RequestItem";

const Home = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [requestData, setRequestData] = useState([]);

  const getList = async () => {
    const res = await API.POST({ url: "/requestInfo/all" });
    setRequestData((prev) => {
      const newData = res.filter(
        (item) =>
          !prev.some((prevItem) => prevItem.request_idx === item.request_idx)
      );
      return [...prev, ...newData];
    });
  };
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    getList().then(() => setIsRefreshing(false));
  }, []);
  useLayoutEffect(() => {
    getList();
  }, []);

  return (
    <View style={styles.container}>
      {requestData.length === 0 ? (
        <Text>데이터가 없습니다.</Text>
      ) : (
        <FlatList
          style={{ width: "100%" }}
          data={requestData}
          renderItem={({ item }) => <RequestItem item={item} />}
          keyExtractor={(item) => item.request_idx.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.85}
        onPress={() => navGo.to("WriteRequest")}
      >
        <FontAwesome5 name="feather-alt" size={20} color="white" />
        <Text style={styles.btnText}>글 쓰기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  floatingButton: {
    backgroundColor: theme["btn-floating"],

    position: "absolute",
    bottom: 25,
    right: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default defaultLayout(Home);
