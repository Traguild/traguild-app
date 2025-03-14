import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

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
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navGo.to("ChatDetail", { chatData: item })}
          >
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            <Text style={styles.time}>{item.time}</Text>
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
