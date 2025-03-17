import React, { useEffect, useState } from "react";
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
import { useRoute } from "@react-navigation/native";
import { io } from "socket.io-client";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const socket = io("https://traguild.kro.kr:8282");

const ChatDetail = () => {
  const route = useRoute();
  const { chatData } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    socket.emit("enter_room", { room: chatData.chat_room_idx });

    socket.on("chatting", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("chatting");
    };
  }, [chatData.chat_room_idx]);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: "Me",
      msg: inputText,
      room: chatData.chat_room_idx,
      time: new Date().toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    socket.emit("chatting", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.chatContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 90}
        >
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.id === "Me" ? styles.myMessage : styles.otherMessage,
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
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="메시지를 입력하세요..."
              placeholderTextColor={theme["default-border"]}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>전송</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
    maxWidth: "75%",
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: theme["default-border"],
    backgroundColor: theme["input-field"],
  },
  textInput: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: theme["input-field"],
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: theme["default-btn"],
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChatDetail;
