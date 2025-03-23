import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { io } from "socket.io-client";
import { useToast } from "react-native-toast-notifications";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatDetail = () => {
  const toast = useToast();
  const flatListRef = useRef(null);
  const socket = useRef(
    io(
      "https://traguild.kro.kr",
      { path: "/socket.io" },
      { transports: ["websocket"] }
    )
  ).current;
  const route = useRoute();
  const USER_IDX = useRef(null);
  const { chatData } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await getMsgData();
      })();
    }, [])
  );

  useEffect(() => {
    socket.emit("enter_room", { room: chatData.chat_room_idx });

    socket.on("chatting", (data) => {
      setMessages((prevMessages) => [data, ...prevMessages]);
    });

    return () => {
      socket.off("chatting");
    };
  }, []);

  const getMsgData = useCallback(async () => {
    USER_IDX.current = await AsyncStorage.getItem("user_idx");

    let res = await API.POST({
      url: "/chatMessage/room",
      data: { chat_room_idx: chatData.chat_room_idx },
    });

    for (let i = 0; i < res.length; i++) {
      res[i].id = parseInt(res[i].user_idx);
      res[i].msg = res[i].chat_detail;
      res[i].room = res[i].chat_room_idx;
      res[i].time = res[i].send_time.split("T")[1].slice(0, 5);
    }

    res.reverse();

    setMessages(res);
  }, [chatData.chat_room_idx]);

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;
    const user_idx = USER_IDX.current;

    const newMessage = {
      id: user_idx,
      msg: inputText,
      room: chatData.chat_room_idx,
      time: new Date()
        .toLocaleTimeString("ko-KR", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
        .split(" ")[0],
    };

    socket.emit("chatting", newMessage);

    await API.PUT({
      url: "/chatMessage",
      data: {
        chat_room_idx: newMessage.room,
        user_idx: newMessage.id,
        chat_detail: newMessage.msg,
      },
    });

    setInputText("");
    handleScrollToEnd();
  };

  const handleScrollToEnd = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 60}
      >
        <FlatList
          style={{ width: "100%" }}
          ref={flatListRef}
          inverted={true}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.id == USER_IDX.current
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.msg}</Text>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
          )}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} />
        </FlatList>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="메시지를 입력하세요..."
            placeholderTextColor={theme["default-border"]}
            onPress={handleScrollToEnd}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["home-bg"],
  },
  chatContainer: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: theme["default-btn"],
    color: "white",
  },
  messageContainer: {
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: theme["request-proceed"],
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: theme["apply-bg"],
  },
  messageText: {
    fontSize: 16,
    color: theme["apply-text"],
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    height: 70,
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: theme["default-border"],
    backgroundColor: theme["input-field"],
  },
  textInput: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    height: "80%",
    backgroundColor: theme["input-field"],
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: theme["default-btn"],
  },
  sendButtonText: {
    color: "white",
    fontWeight: 500,
    fontSize: 16,
  },
});

export default ChatDetail;
