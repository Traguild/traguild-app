import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "../../resources/theme/common";

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import MyItem from "components/04-myPage/MyItem";
import MyManner from "components/04-myPage/MyManner";
import Button from "components/common/Button";
import ApplyList from "components/04-myPage/ApplyList";

const dummyLogin = {
  user_id: "gdhong",
  user_pw: "mypassword",
  user_name: "홍길동",
  user_nick: "RBRoad",
  user_email: "gdhong@gmail.com",
  user_birth: "1900-01-01",
  user_region: "김해시",
};

const dummyCredit = 9999;

const MyPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image source={defaultImg.logo} style={styles.profilePic} />
        <View style={styles.profileTop}>
          <Text style={styles.profileName}>{dummyLogin.user_nick}</Text>
          <MyManner />
        </View>
      </View>

      <View style={styles.myCreditBox}>
        <Text style={styles.myCredit}>My Credit : {dummyCredit} Credit</Text>
        <TouchableOpacity style={styles.chargeButton} activeOpacity={0.7}>
          <Text style={styles.chargeButtonText}>충전하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.requestBox}>
        {/* 각 버튼에 따라 다른 페이지로 이동 */}
        {[
          { text: "찜한 의뢰", screen: "Favorite" }, // 찜한 의뢰 화면으로 이동
          { text: "의뢰 내역", screen: "QuestList" }, // 의뢰 내역 화면으로 이동
          { text: "프로필 수정", screen: "ProfileEdit" }, // 프로필 수정 화면으로 이동
        ].map((item, idx) => (
          <MyItem
            key={idx}
            text={item.text}
            onPress={() => {
              navGo.to(item.screen);
            }}
          />
        ))}
      </View>

      <View style={styles.applyListContainer}>
        <Text style={styles.applyListTitle}>지원자 목록</Text>
        <ApplyList />
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
    fontWeight: "700",
  },

  myCreditBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",

    borderColor: "lightgray",
    borderTopWidth: 0.45,
    borderBottomWidth: 0.45,
  },

  myCredit: {
    marginLeft: "auto",
    marginBottom: 10,

    fontSize: 24,
    fontWeight: "700",
  },

  chargeButton: {
    marginLeft: "auto", // 버튼을 오른쪽으로 밀어냄
    backgroundColor: theme["default-btn"], // 버튼 배경색 (예시)
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  chargeButtonText: {
    color: "white", // 텍스트 색상
    fontSize: 16,
    fontWeight: "bold",
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
  },
  applyListTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    marginLeft: 10,
    textAlign: "flex-start",
    width: "100%",
  },
});

export default defaultLayout(MyPage);
