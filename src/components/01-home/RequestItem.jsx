import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

// IMPORT CONFIGS
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { FontAwesome5, Ionicons } from "react-native-vector-icons";
import { getTitle, getCost, getKorDate } from "resources/js/common";
import { Feather } from "@expo/vector-icons";

// IMPORT COMPONENTS
import RequestState from "components/01-home/RequestState";
import { useFocusEffect } from "@react-navigation/native";

let LIMIT = 10;

const RequestItem = ({
  item,
  isOwner = false,
  isMenuVisible = false,
  onToggleMenu,
  statusLabel = "",
}) => {
  const thumbImgUri = "https://traguild.kro.kr/api/requestInfo/getImage/";
  const movDetail = () => navGo.to("RequestDetail", { item });
  let page = 1;
  const [interestIdx, setinterestIdx] = useState(false);
  const [userIdx, setUserIdx] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchUserIdxAndFavorites = async () => {
        const idx = await AsyncStorage.getItem("user_idx");
        setUserIdx(idx);

        if (idx) {
          try {
            const interestRes = await API.POST({
              url: "/interestRequest/fetch",
              data: {
                user_idx: idx,
                page,
                limit: LIMIT,
              },
            });

            if (Array.isArray(interestRes)) {
              const favoriteIds = interestRes.map((item) => item.request_idx);
              setinterestIdx(favoriteIds.includes(item.request_idx));
            }
          } catch (error) {
            console.error("찜한 의뢰 가져오기 실패:", error);
          }
        }
      };
      fetchUserIdxAndFavorites();
    }, [])
  );

  const toggleFavorite = async () => {
    if (!userIdx) {
      console.error("사용자 ID가 없습니다.");
      return;
    }

    try {
      if (interestIdx) {
        const interestRes = await API.POST({
          url: "/interestRequest/exactly",
          data: {
            user_idx: userIdx,
            request_idx: item.request_idx,
          },
        });
        const intIdx = interestRes?.[0]?.interest_idx;

        const res = await API.DEL({
          url: "/interestRequest/delete",
          data: { interest_idx: intIdx },
        });

        if (res) {
          setinterestIdx(false);
        } else {
          console.error("찜 해제 실패:", res);
        }
      } else {
        const res = await API.PUT({
          url: "/interestRequest",
          data: {
            user_idx: userIdx,
            request_idx: item.request_idx,
          },
        });

        if (res?.interest_idx) {
          setinterestIdx(true);
        } else {
          console.error("❌ 찜하기 실패:", res);
        }
      }
    } catch (error) {
      console.error("❌ 찜하기/삭제 요청 실패:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listItem}
        activeOpacity={0.7}
        onPress={movDetail}
      >
        {!isOwner && (
          <TouchableOpacity onPress={toggleFavorite} style={styles.heartButton}>
            <Ionicons
              name={interestIdx ? "heart" : "heart-outline"}
              size={24}
              color="red"
            />
          </TouchableOpacity>
        )}
        <Image
          source={
            item.request_img
              ? {
                uri: `${thumbImgUri}${item.request_idx}?timestamp=${new Date().getTime()}`,
              }
              : defaultImg.logo
          }
          style={styles.itemImg}
        />
        <View style={styles.itemText}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            <RequestState text={item.request_state} />
            {statusLabel !== "" && (
              <View style={styles.statusLabel}>
                <Text style={styles.statusText}>{statusLabel}</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.itemTitle}>
              {getTitle(item.request_title, 18)}
            </Text>
          </View>
          <View style={styles.regionBox}>
            <FontAwesome5
              style={styles.region}
              name="map-marker-alt"
              size={24}
              color="black"
            />
            <Text style={{ ...styles.region, marginLeft: 5 }}>
              {item.request_region}
            </Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>{getKorDate(item.created_date)}</Text>
          </View>
          <View style={styles.itemCostBox}>
            <Text style={styles.itemCost}>{getCost(item.request_cost)} 원</Text>
          </View>

        </View>
      </TouchableOpacity>
      {isOwner && (
        <>
          <TouchableOpacity style={styles.iconContainer} onPress={onToggleMenu}>
            <Feather name="more-vertical" size={24} color="black" />
          </TouchableOpacity>
          {isMenuVisible && (
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => onToggleMenu(item.request_idx)}
              >
                <Text style={styles.menuText}>삭제</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: theme["home-bg"],
    // borderColor: theme["home-border"],
    // borderTopWidth: 1,
    width: "100%",
    flexDirection: "row",
    paddingVertical: 12,
  },
  itemImg: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 15,
  },
  itemText: {
    flexDirection: "column",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  heartButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  regionBox: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  region: {
    fontSize: 12,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  dateBox: {},
  dateText: {
    fontSize: 10,
    color: "#999",
  },
  itemCostBox: {
    flexDirection: "row",
  },
  itemCost: {
    fontSize: 16,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  statusLabel: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: theme["status-label"],
  },
  statusText: {
    fontSize: 12,
    color: "#333",
  },
  menu: {
    position: "absolute",
    right: 10,
    top: 40,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  menuText: {
    color: "black",
    fontSize: 16,
  },
});

export default RequestItem;
