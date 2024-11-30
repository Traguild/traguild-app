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

// IMPORT COMPONENTS
import ApplyRequest from "views/01-home/ApplyRequest";
import RequestState from "components/01-home/RequestState";
import MyManner from "components/04-myPage/MyManner";
import Button from "components/common/Button";

const RequestDetail = ({ navigation, route }) => {
  const toast = useToast();
  const { item } = route.params;

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
    if (USER_IDX.current === item.user_idx) {
      toast.show("본인의 의뢰에는 지원할 수 없습니다.");
      setModalVisible(false);
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
              source={defaultImg.logo}
              style={{
                ...styles.itemImg,
                height: layout().width,
                width: layout().width,
              }}
            />

            <View style={styles.itemContents}>
              <RequestState text={item.request_state} />
              <Text style={styles.itemTitle}>{item.request_title}</Text>
              <Text style={styles.itemCost}>
                {getCost(item.request_cost)} 원
              </Text>
              <Text style={styles.itemDescription}>{item.request_content}</Text>
            </View>
          </ScrollView>
        </View>

        <View
          style={{ ...styles.footerContainer, height: layout().height * 0.1 }}
        >
          <View style={styles.footerProfiles}>
            <Image source={defaultImg.logo} style={styles.profileImg} />
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
          </View>
          {item.request_state === "완료" ? (
            <Button type="light" text="지원마감" bgColor="gray" disabled />
          ) : (
            <Button type="light" text="지원하기" onPress={handleApply} />
          )}
        </View>
      </View>
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
    borderColor: theme["default-border"],
    borderBottomWidth: 0.45,

    marginBottom: 20,
    paddingVertical: 10,
  },
  itemDescription: {
    fontSize: 16,
    lineHeight: 24,
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
