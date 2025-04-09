import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT COMPONENTS
import SearchFilterModal from "components/01-home/SearchFilterModal";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { layout } from "resources/theme/layout";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import RequestItem from "components/01-home/RequestItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LIMIT = 10;

const SearchResults = () => {
  const HEIGHT = layout().height;
  const route = useRoute();

  let page = 1;
  let prevData = 0;

  const scale = useRef(new Animated.Value(0)).current;
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(false);

  const [searchTrigger, setSearchTrigger] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestData, setRequestData] = useState([]);

  const getList = async (reset = false) => {
    const user_idx = await AsyncStorage.getItem("user_idx");

    const res = await API.POST({
      url: "/requestInfo/title",
      data: {
        user_idx: user_idx,
        request_title: keyword,
        page: 1,
        limit: 10,
        mode: filter === "모두" ? 0 : 1,
        request_category: filter,
      },
    });

    if (res?.message) res = [];
    setRequestData(res);
  };

  useEffect(() => {
    setKeyword(route.params.keyword);
    setFilter(route.params.filter);
    setSearchTrigger(true);
  }, [route.params.keyword, route.params.filter]);

  useEffect(() => {
    if (searchTrigger) {
      getList();
    }
  }, [searchTrigger]);

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

  const resizebox = (to) => {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { height: HEIGHT * (0.1 + (Platform.OS === "ios" ? 0.02 : 0)) },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            top: Platform.OS === "ios" ? 15 : 10,
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => navGo.back()}>
            <Entypo
              name="chevron-left"
              style={{ marginTop: 18 }}
              size={30}
              color={theme["default-btn"]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "20%" }}
            activeOpacity={1}
            onPress={() => {
              resizebox(1);
            }}
          >
            <TextInput
              style={styles.headerCategoryBox}
              value={filter}
              editable={false}
              onPress={() => {
                resizebox(1);
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.headerSearchBox}
            maxLength={18}
            placeholder="터치해서 검색"
            returnKeyType="search"
            value={keyword}
            onChangeText={(text) => {
              setKeyword(text);
            }}
            onSubmitEditing={() => {
              setSearchTrigger(true);
              getList();
            }}
          />
          <FontAwesome6
            name="magnifying-glass"
            size={14}
            color={theme["btn-floating"]}
            style={styles.headerMagnifier}
          />
        </View>
      </View>
      <View style={styles.body}>
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
      </View>
      <SearchFilterModal
        filterState={{ filter, setFilter }}
        visibleState={{ visible, setVisible }}
        resizebox={resizebox}
        scale={scale}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme["default-bg"],
  },
  headerCategoryBox: {
    top: 8,
    backgroundColor: theme["input-field"],
    borderRadius: 20,
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "bold" : "500",
    padding: 12,
    color: theme["apply-text"],

    textAlign: "center",
  },
  headerMagnifier: {
    position: "absolute",
    right: 16,
    top: "50%",
    color: theme["apply-text"],
    weight: "bold",
  },
  headerSearchBox: {
    top: 8,
    width: "68%",
    backgroundColor: theme["input-field"],
    fontSize: 16,
    padding: 12,
    borderRadius: 20,
    color: theme["apply-text"],
    paddingRight: 40,
    paddingLeft: 16,
  },

  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme["home-bg"],
  },
  emptyItems: {
    alignSelf: "center",
    color: "gray",
    marginTop: 20,
  },
});
