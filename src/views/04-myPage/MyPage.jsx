import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { getCost } from "resources/js/common";
import { theme } from "../../resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import MyItem from "components/04-myPage/MyItem";
import MyManner from "components/04-myPage/MyManner";
import ApplyList from "components/04-myPage/ApplyList";
import Button from "components/common/Button";

const dummyLogin = {
  user_id: "gdhong",
  user_pw: "mypassword",
  user_name: "홍길동",
  user_nick: "RBRoad",
  user_email: "gdhong@gmail.com",
  user_birth: "1900-01-01",
  user_region: "김해시",
};

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const user_idx = await AsyncStorage.getItem("user_idx");

      const res = await API.POST({
        url: "/userInfo",
        data: { user_idx },
      });

      setUserInfo(res);
    };
    getUserInfo();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem("user_idx");
    navGo.re("Main");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image source={defaultImg.logo} style={styles.profilePic} />
        <View style={styles.profileTop}>
          <Text style={styles.profileName}>
            {userInfo?.user_nickname ?? "알 수 없음"}
          </Text>
          <MyManner rate={userInfo?.user_rate ?? 50} />
        </View>
        <TouchableOpacity
          style={styles.signOutBtn}
          activeOpacity={0.7}
          onPress={signOut}
        >
          <Text style={styles.signOutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.myCreditBox}>
        <FontAwesome5 name="coins" size={18} color="#f7b801" />
        <Text style={styles.myCredit}>
          {getCost(userInfo?.user_credit ?? 0)} 코인
        </Text>
        <TouchableOpacity style={styles.chargeButton} activeOpacity={0.7}>
          <Text style={styles.chargeButtonText}>충전하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.requestBox}>
        {[
          { text: "찜한 의뢰", screen: "Favorite" },
          { text: "의뢰 내역", screen: "QuestList" },
          { text: "프로필 수정", screen: "ProfileEdit" },
        ].map((item, idx) => (
          <MyItem
            key={idx}
            text={item.text}
            onPress={() => {
              navGo.to(item.screen, { userInfo });
            }}
          />
        ))}
      </View>

      <View style={styles.applyListContainer}>
        <Text style={styles.applyListTitle}>지원자 목록</Text>
        <View style={styles.applyList}>
          <ApplyList />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",

    borderColor: "lightgray",
    borderTopWidth: 0.45,
    borderBottomWidth: 0.45,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 46,
  },
  profileTop: {
    marginLeft: 15,
    flexDirection: "column",
  },
  profileName: {
    marginBottom: 10,

    fontSize: 24,
    fontWeight: "600",
  },

  myCreditBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingLeft: 25,
    width: "100%",

    borderColor: "lightgray",
    borderBottomWidth: 0.45,
  },

  myCredit: {
    marginLeft: 18,

    fontSize: 18,
    fontWeight: "500",
  },

  chargeButton: {
    marginLeft: "auto",
    backgroundColor: theme["default-btn"],
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  chargeButtonText: {
    color: "white", // 텍스트 색상
    fontSize: 16,
    fontWeight: "500",
  },

  signOutBtn: {
    marginLeft: "auto",
    backgroundColor: theme["light-btn"],
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 50,
  },
  signOutText: {
    color: "white", // 텍스트 색상
    fontSize: 12,
    fontWeight: "600",
  },

  requestBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",

    borderColor: "lightgray",
    borderBottomWidth: 0.45,
    justifyContent: "space-around",
  },
  applyListContainer: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  applyListTitle: {
    color: theme["apply-text"],
    fontSize: 18,
    fontWeight: "600",

    marginLeft: 5,
    marginTop: 15,
    marginBottom: 10,
    textAlign: "flex-start",
    width: "100%",
  },
  applyList: {
    flex: 1,
    borderWidth: 0.45,
    borderColor: "lightgray",
    borderRadius: 15,
  },
});

export default defaultLayout(MyPage);
