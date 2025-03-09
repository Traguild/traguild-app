import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  const [UserIdx, setUserIdx] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const user_idx = await AsyncStorage.getItem("user_idx");
        if (!user_idx) {
          setIsLoading(false);
          return;
        }
        setUserIdx(user_idx);

        const interestRes = await API.POST({
          url: "/interestRequest/all",
          data: { user_idx },
        });

        if (!Array.isArray(interestRes) || interestRes.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        const InterestRequest = interestRes.filter(
          (item) => item.user_idx === user_idx
        );

        if (InterestRequest.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        const requestIdxList = [...new Set(InterestRequest.map((item) => item.request_idx))];

        if (requestIdxList.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        const requestPromises = requestIdxList.map(async (request_idx) => {
          const res = await API.POST({
            url: "/requestInfo",
            data: { request_idx },
          });
          return res;
        });

        const requestRes = await Promise.all(requestPromises);
        const flattenedRequests = requestRes.flat();
        const validRequests = flattenedRequests.filter((res) => res && res.request_idx);

        if (validRequests.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        const favoriteItems = validRequests.map((item) => ({
          ...item,
          is_favorite: true,
        }));

        setFavorites(favoriteItems);
      } catch (error) {
        console.error("찜한 의뢰 가져오기 오류:", error);
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
          <Text style={styles.loadingText}>데이터를 불러오는 중입니다...</Text>
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={favorites}
            renderItem={({ item }) => (
              <RequestItem
                item={item}
                isOwner={item.user_idx === UserIdx}
                isMenuVisible={activeMenuId === item.request_idx}
                onToggleMenu={() =>
                  setActiveMenuId(
                    activeMenuId === item.request_idx ? null : item.request_idx
                  )
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
  loadingText: {
    textAlign: "center",
    marginTop: 20,
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
