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
            <TouchableOpacity
              onPress={() => navGo.to("UserProfile", {
                user_idx: item.user_idx,
                user_nickname: item.user_nickname,
              })}
            >
              <Text style={styles.chatName}>{item.user_nickname}</Text>
            </TouchableOpacity>
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
