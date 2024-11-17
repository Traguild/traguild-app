import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// IMPORT RESOURCES
import { defaultImg } from 'resources/img/defaultImg';

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import MyItem from "components/04-myPage/MyItem";
import MyManner from "components/04-myPage/MyManner";

const MyPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image source={defaultImg.logo} style={styles.profilePic} />
        <View style={styles.profileTop}>
          <Text style={styles.profileName}>이름</Text>
          <MyManner />
        </View>
      </View>

      <View style={styles.requestBox}>
        {["찜한 의뢰", "의뢰 내역", "프로필 수정"].map((text, idx) => (
          <MyItem key={idx} text={text} />
        ))}
      </View>
    </View>
  );
}

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

  requestBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",

    borderColor: "lightgray",
    borderBottomWidth: 0.45,
    justifyContent: "space-around"
  },
});

export default defaultLayout(MyPage);