import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, MaterialIcons } from "@expo/vector-icons";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";
import { getContents } from "../../resources/js/common";
import { useFocusEffect } from "@react-navigation/native";

const ApplyList = ({ onSelectApplicant }) => {
  const [applyList, setApplyList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getApplyList = async () => {
        const user_idx = await AsyncStorage.getItem("user_idx");
        const res = await API.POST({
          url: "/requestApplicant/getApply",
          data: {
            user_idx,
            page: 1,
            limit: 10,
            status: "대기",
          },
        });

        setApplyList(res);
      };
      getApplyList();
    }, [])
  );

  const proceedApply = async ({
    request_title,
    request_idx,
    user_idx,
    user_nickname,
    applicant_state,
  }) => {
    const host_user_idx = await AsyncStorage.getItem("user_idx");
    // TODO - 임시 주석
    //const res = true;
    const res = await API.POST({
      url: "/requestApplicant/update",
      data: { request_idx, user_idx, applicant_state },
    });

    if (res) {
      if (applicant_state === "승인") {
        // TODO - 임시 주석
        // await API.POST({
        //   url: "/requestApplicant/rejectAll",
        //   data: { request_idx, applicant_state: "반려" },
        // });
        // await API.POST({
        //   url: "/requestInfo/update",
        //   data: {
        //     request_idx,
        //     request_state: "모집",
        //     applicant_idx: user_idx,
        //   },
        // });

        //채팅방 생성
        const chat_data = await API.PUT({
          url: "/chatRoom",
          data: {
            request_idx,
            chat_room_name: request_title,
          },
        });

        await API.PUT({
          url: "/chatList",
          data: {
            chat_room_idx: chat_data.chat_room_idx,
            user_idx,
          },
        });
        await API.PUT({
          url: "/chatList",
          data: {
            chat_room_idx: chat_data.chat_room_idx,
            user_idx: host_user_idx,
          },
        });

        chat_data.user_nickname = user_nickname;
        chat_data.user_idx = user_idx;
        chat_data.request_idx = request_idx;

        navGo.to("ChatDetail", {
          chatData: chat_data,
        });
      }

      const getApplyList = async () => {
        const res = await API.POST({
          url: "/requestApplicant/getApply",
          data: {
            user_idx: host_user_idx,
            page: 1,
            limit: 10,
            status: "대기",
          },
        });

        setApplyList(res);
      };
      getApplyList();
    }
  };

  const handleApply = (item) => {
    Alert.alert(
      `${item.request_title}`,
      `지원자 ${item.user_nickname}님을 ${item.applicant_state}하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => proceedApply(item),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelectApplicant(item)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.title}>의뢰: {item.request_title}</Text>
        <Text style={styles.subtitle}>
          {item?.user_nickname ?? "알 수 없음"}
        </Text>

        <Text style={styles.applyIntro}>
          {getContents(item.applicant_intro, 25)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={() => handleApply({ ...item, applicant_state: "승인" })}
        >
          <Text style={styles.buttonText}>승인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleApply({ ...item, applicant_state: "반려" })}
        >
          <Text style={{ ...styles.buttonText, color: "#ff7f51" }}>반려</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{ width: "100%" }}
      data={applyList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MaterialIcons
            style={{ marginTop: 70 }}
            name="content-paste-off"
            size={120}
            color="lightgray"
          />
          <Text style={styles.emptyText}>지원자가 없습니다.</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: theme["home-bg"],
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 0.45,
    borderColor: theme["default-border"],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 15,
    marginTop: 5,
  },
  applyIntro: {
    color: "gray",
    fontSize: 12,
  },
  emptyText: {
    color: "gray",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  approveButton: {
    backgroundColor: "#6a994e",
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: "#ff7f51",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
});

export default ApplyList;
