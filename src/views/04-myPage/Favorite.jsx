import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";

// IMPORT CONFIGS
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import RequestItem from "components/01-home/RequestItem";

const FavoriteList = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "찜한 의뢰 목록",
      headerTintColor: theme["default-btn"],
    });
  }, [navigation]);

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [userIdx, setUserIdx] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const storedUserIdx = await AsyncStorage.getItem("user_idx");
        if (!storedUserIdx) {
          setIsLoading(false);
          return;
        }
        setUserIdx(storedUserIdx);

        const interestRes = await API.POST({
          url: "/interestRequest/all",
          data: { user_idx: storedUserIdx },
        });

        if (!Array.isArray(interestRes) || interestRes.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        const interestRequestIdxList = interestRes.map((item) => item.request_idx);

        const requestRes = await API.POST({
          url: "/requestInfo/all",
          data: {},
        });

        if (!Array.isArray(requestRes) || requestRes.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        const favoriteItems = requestRes
          .filter((item) => interestRequestIdxList.includes(item.request_idx))
          .map((item) => ({
            ...item,
            is_favorite: true,
          }));

        setFavorites(favoriteItems);
      } catch (error) {
        console.error("❌ 찜한 의뢰 가져오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleDismissMenu = () => {
    if (activeMenuId !== null) {
      setActiveMenuId(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissMenu}>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme["default-btn"]} />
            <Text style={styles.loadingText}>데이터를 불러오는 중입니다...</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <RequestItem
                item={item}
                isOwner={item.user_idx === userIdx}
                isMenuVisible={activeMenuId === item.request_idx}
                onToggleMenu={() =>
                  setActiveMenuId(activeMenuId === item.request_idx ? null : item.request_idx)
                }
              />
            )}
            keyExtractor={(item) => item.request_idx.toString()}
            ListEmptyComponent={
              <Text style={styles.emptyText}>찜한 의뢰가 없습니다.</Text>
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});

export default FavoriteList;
