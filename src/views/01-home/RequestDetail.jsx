import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { layout } from "resources/theme/layout";
import { getCost } from "resources/js/common";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "react-native-vector-icons";

// IMPORT COMPONENTS
import ApplyRequest from "views/01-home/ApplyRequest";
import RequestState from "components/01-home/RequestState";
import MyManner from "components/04-myPage/MyManner";
import Button from "components/common/Button";

const RequestDetail = ({ navigation, route }) => {
  const toast = useToast();
  const { item, myUserIdx } = route.params;

  const userImgUri = "https://traguild.kro.kr/api/userInfo/userImg/";
  const requestImgUri = "https://traguild.kro.kr/api/requestInfo/getImage/";
  const USER_IDX = useRef(null);
  const [postUserInfo, setPostUserInfo] = useState({});
  const [applyInfo, setApplyInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      headerTintColor: theme["default-btn"],
    });

    const getPostUserInfo = async () => {
      const res = await API.POST({
        url: "/userInfo",
        data: { user_idx: item.user_idx },
      });
      if (res.user_img != "")
        res.user_img = `${userImgUri}${item.user_idx}?timestamp=${new Date().getTime()}`;

      setPostUserInfo(res);
    };

    const getUserInfo = async () => {
      USER_IDX.current = await AsyncStorage.getItem("user_idx");

      const res = await API.POST({
        url: "/userInfo",
        data: { user_idx: USER_IDX.current },
      });
      res.request_idx = item.request_idx;
      setApplyInfo(res);
    };

    getPostUserInfo();
    getUserInfo();
  }, []);

  const handleApply = () => {
    setModalVisible(true);

    const isOwnRequest =
      (Number(USER_IDX.current) === Number(item.user_idx)) ||
      (Number(myUserIdx) === Number(item.user_idx));

    if (isOwnRequest) {
      toast.show("본인의 의뢰에는 지원할 수 없습니다.");
      setModalVisible(false);
      return;
    }

  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <ApplyRequest
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          info={applyInfo}
        />
        <View style={{ height: layout().height * 0.9 }}>
          <ScrollView>
            <Image
              source={
                item.request_img
                  ? {
                    uri: `${requestImgUri}${item.request_idx}?timestamp=${new Date().getTime()}`,
                  }
                  : defaultImg.logo
              }
              style={{
                ...styles.itemImg,
                height: layout().width,
                width: layout().width,
              }}
            />

            <View style={styles.itemContents}>
              <View style={styles.itemHeaderRow}>
                <RequestState text={item.request_state} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navGo.to("Report", {
                      report_user_idx: USER_IDX.current,
                      reported_user_idx: postUserInfo?.user_idx,
                      reported_request_idx: item.request_idx,
                    });
                  }}
                >
                  <MaterialIcons name="report" size={25} color="#ff5a5f" />
                </TouchableOpacity>
              </View>

              <Text style={styles.itemTitle}>{item.request_title}</Text>

              <View style={styles.regionBox}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={14}
                  color="black"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.regionText}>{item.request_region}</Text>
              </View>

              <View style={styles.costAndCategoryRow}>
                <Text style={styles.itemCost}>
                  {getCost(item.request_cost)} 원
                </Text>
                <Text style={styles.itemCategory}>{item.request_category}</Text>
              </View>
              <Text style={styles.itemDescription}>{item.request_content}</Text>

              {/* TODO: Comments Box */}
            </View>
          </ScrollView>
        </View>

        <View
          style={{ ...styles.footerContainer, height: layout().height * 0.1 }}
        >
          <TouchableOpacity
            style={styles.footerProfiles}
            activeOpacity={0.8}
            onPress={() =>
              navGo.to("UserProfile", {
                user_idx: postUserInfo?.user_idx,
                user_nickname: postUserInfo?.user_nickname,
              })
            }
          >
            <Image
              source={
                postUserInfo.user_img !== ""
                  ? { uri: postUserInfo.user_img }
                  : defaultImg.logo
              }
              style={styles.profileImg}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              {postUserInfo?.user_nickname ?? "알 수 없음"}
            </Text>
            <MyManner
              rate={postUserInfo?.user_rate}
              descript={false}
              size={16}
              style={{ marginBottom: 25 }}
            />
          </TouchableOpacity>
          {item.request_state === "모집" ? (
            <Button type="light" text="지원하기" onPress={handleApply} />
          ) : (
            <Button type="light" text="지원마감" bgColor="gray" disabled />
          )}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          width: 130,
          height: 35,
          backgroundColor: theme["btn-floating"],
          opacity: 0.8,
          borderRadius: 50,
          position: "absolute",
          bottom: 105,
          right: 130,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navGo.to("RequestComment", { request_idx: item.request_idx });
        }}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>
          {"댓글로 이동"}
        </Text>
      </TouchableOpacity>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  itemImg: {
    marginBottom: 20,
  },
  itemContents: {
    paddingHorizontal: 30,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  itemCost: {
    fontSize: 18,
    fontWeight: "500",
    paddingVertical: 10,
  },
  itemDescription: {
    fontSize: 16,
    lineHeight: 24,
    height: 180,
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  costAndCategoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 0.45,
    borderColor: theme["default-border"],
  },
  itemCategory: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  footerContainer: {
    borderTopWidth: 0.45,
    borderColor: theme["default-border"],

    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerProfiles: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  regionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  regionText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
  profileImg: {
    width: 60,
    height: 60,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 12,
  },
});

export default RequestDetail;
