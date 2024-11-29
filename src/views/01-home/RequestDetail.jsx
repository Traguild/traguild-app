import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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

const RequestDetail = ({ navigation, route }) => {
  const { item } = route.params;
  console.log(item);

  const [userInfo, setUserInfo] = useState({});
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

    const getUserInfo = async () => {
      const res = await API.POST({
        url: "/userInfo",
        data: { user_idx: item.user_idx },
      });
      setUserInfo(res);
    };
    getUserInfo();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <ApplyRequest
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
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
              {userInfo?.user_nickname ?? "알 수 없음"}
            </Text>
            <MyManner
              rate={userInfo?.user_rate}
              descript={false}
              size={16}
              style={{ marginBottom: 25 }}
            />
          </View>
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              지원하기
            </Text>
          </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "bold",
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
  applyBtn: {
    backgroundColor: theme["default-btn"],
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RequestDetail;
