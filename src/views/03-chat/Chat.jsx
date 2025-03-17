import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 더미 채팅 목록 데이터
const chatListData = [
  { id: "1", name: "김철수", lastMessage: "안녕하세요!", time: "10:30 AM" },
  {
    id: "2",
    name: "이영희",
    lastMessage: "오늘 만날 수 있을까요?",
    time: "09:45 AM",
  },
  { id: "3", name: "박민수", lastMessage: "감사합니다!", time: "어제" },
  { id: "4", name: "홍길동", lastMessage: "확인 부탁드려요", time: "이틀 전" },
];

const ChatList = () => {
  const USER_IDX = useRef(null);
  const [userInfo, setUserInfo] = useState({});

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        await getUserInfo();
      };
      getData();
    }, [getUserInfo])
  );

  const getUserInfo = async () => {
    USER_IDX.current = await AsyncStorage.getItem("user_idx");
    const user_idx = USER_IDX.current;

    const res = await API.POST({
      url: "/chatList/mine",
      data: { user_idx },
    });

    if (JSON.stringify(res) !== JSON.stringify(userInfo)) {
      setUserInfo(res);
    }

    console.log(res);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userInfo}
        keyExtractor={(item) => item.chat_room_idx}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navGo.to("ChatDetail", { chatData: item })}
          >
            <Text style={styles.chatName}>{item.user_nickname}</Text>
            <Text style={styles.lastMessage}>{item.chat_detail}</Text>
            <Text style={styles.time}>
              {String(item?.send_time ?? "").split("T")[0] ?? ""}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["home-bg"],
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme["home-border"],
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  time: {
    fontSize: 12,
    color: "#aaa",
    position: "absolute",
    right: 15,
    top: 15,
  },
});

export default ChatList;
