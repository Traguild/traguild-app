import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { icons } from "resources/theme/icons";
import { Entypo } from "react-native-vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const RequestDetail = ({ navigation, route }) => {
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      // headerStyle: { backgroundColor: theme["tab-active"] },
      headerTintColor: theme["default-btn"],
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <ScrollView>
          <Image source={defaultImg.logo} style={styles.itemImg} />

          <View style={styles.itemContents}>
            <Text style={styles.itemTitle}>{item.request_content}</Text>
            <Text style={styles.itemCost}>{item.request_cost} 원</Text>
            <Text style={styles.itemDescription}>{item.request_content}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerProfiles}>
          <Image source={defaultImg.logo} style={styles.profileImg} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            홍길동
          </Text>
          <Entypo
            name={icons["manner-default"]}
            size={16}
            color={theme[icons["manner-default"]]}
            style={{ marginBottom: 25 }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: theme["default-btn"],
            paddingVertical: 15,
            paddingHorizontal: 25,
            borderRadius: 15,
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            지원하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  bodyContainer: {
    height: HEIGHT * 0.9,
  },
  itemImg: {
    width: WIDTH,
    height: WIDTH,

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
  },

  footerContainer: {
    height: HEIGHT * 0.1,
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
