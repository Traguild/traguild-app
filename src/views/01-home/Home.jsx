import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import RequestItem from "components/01-home/RequestItem";

const LIMIT = 10;

const Home = () => {
  let page = 1;
  let prevData = 0;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestData, setRequestData] = useState([]);

  const getList = async (reset = false) => {
    const user_idx = await AsyncStorage.getItem("user_idx");
    const res = await API.POST({
      url: "/requestInfo/fetch",
      data: { user_idx, page, limit: LIMIT },
    });

    if (res?.message) res = [];
    setRequestData((prev) => {
      const newData = reset
        ? res
        : res.filter(
            (item) =>
              !prev.some(
                (prevItem) => prevItem.request_idx === item.request_idx
              )
          );

      prevData = newData.length;
      if (prevData === LIMIT) page++;
      return reset ? [...newData] : [...prev, ...newData];
    });
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    page = 1;
    prevData = 0;

    setTimeout(() => {
      getList(true).then(() => {
        setIsRefreshing(false);
      });
    }, 500);
  }, []);
  const onEndReached = useCallback(() => {
    if (prevData === LIMIT) {
      setIsLoading(true);
      getList().then(() => setIsLoading(false));
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getList();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={requestData}
        renderItem={({ item }) => <RequestItem item={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyItems}>데이터를 불러올 수 없습니다.</Text>
        }
        keyExtractor={(item) => item.request_idx.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onEndReached={() => !isLoading && onEndReached()}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isLoading && <ActivityIndicator />}
      />

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
  emptyItems: {
    alignSelf: "center",
    color: "gray",
    marginTop: 20,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default defaultLayout(Home);
