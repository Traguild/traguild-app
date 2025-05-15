import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect } from "react";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { useToast } from "react-native-toast-notifications";

const Report = ({ navigation, route }) => {
  const toast = useToast();
  const req = route.params;
  const filter = ["비매너", "성희롱", "욕설", "음란물", "사기", "기타"];
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "신고하기",
      headerStyle: { backgroundColor: theme["default-bg"] },
      headerTintColor: theme["default-btn"],
    });
  });

  const handleReport = async (type) => {
    if (req.report_user_idx == req.reported_user_idx) {
      toast.show("자신의 의뢰는 신고할 수 없습니다.");
      navGo.back();
      return;
    }

    const res = await API.PUT({
      url: "/report",
      data: {
        report_user_idx: req.report_user_idx,
        reported_request_idx: req.reported_request_idx,
        reported_user_idx: req.reported_user_idx,
        report_type: type,
      },
    });

    if (res) toast.show("신고가 완료되었습니다.");
    else toast.show("이미 신고한 게시글입니다.");
    navGo.back();
  };

  return (
    <View style={styles.container}>
      {filter.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.item}
            activeOpacity={0.5}
            onPress={() => {
              handleReport(item);
            }}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  item: {
    width: "100%",
    height: 50,
    borderBottomWidth: 0.3,
    borderBottomColor: "gray",
    justifyContent: "center",
    paddingLeft: 20,
  },
  itemText: {
    fontSize: 16,
    color: theme["default-text"],
  },
});
