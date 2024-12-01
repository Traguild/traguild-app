import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "react-native-vector-icons";
import { getTitle, getCost, getKorDate } from "resources/js/common";
import { Feather } from "@expo/vector-icons";

// IMPORT COMPONENTS
import RequestState from "components/01-home/RequestState";

const RequestItem = ({ item, isOwner }) => {
  const movDetail = () => navGo.to("RequestDetail", { item });
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    item.imgUri = `https://traguild.kro.kr/api/requestInfo/getImage/${item.request_idx}`;
  }, []);

  const handleDeleteRequest = async () => {
    try {
      const res = await API.POST({
        url: `/requestInfo/update`,
        data: {
          request_idx: item.request_idx,
          is_deleted: true,
        },
      });

      if (res) {
        console.log("의뢰글이 성공적으로 삭제되었습니다.");
        setMenuVisible(false);
      } else {
        console.error("의뢰글 삭제에 실패하였습니다.");
      }
    } catch (error) {
      console.error("에러가 발생함", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.listItem}
        activeOpacity={0.7}
        onPress={movDetail}
      >
        <Image
          source={item.request_img ? { uri: item.imgUri } : defaultImg.logo}
          style={styles.itemImg}
        />
        <View style={styles.itemText}>
          <RequestState text={item.request_state} />
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
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setMenuVisible((prev) => !prev)}
          >
            <Feather name="more-vertical" size={24} color="black" />
          </TouchableOpacity>

          {isMenuVisible && (
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleDeleteRequest}
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
    borderColor: theme["home-border"],
    borderTopWidth: 1,

    width: "100%",
    flexDirection: "row",
    paddingVertical: 13,
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
