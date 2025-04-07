import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
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
import { defaultImg } from "resources/img/defaultImg";
import { getTitle, getCost } from "resources/js/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RequestState from "components/01-home/RequestState";

const ChatDetail = () => {
  const toast = useToast();
  const flatListRef = useRef(null);
  const socket = useRef(
    io("https://traguild.kro.kr", {
      path: "/socket.io",
      transports: ["websocket"],
    })
  ).current;
  const route = useRoute();
  const USER_IDX = useRef(null);
  const { chatData } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [requestInfo, setRequestInfo] = useState(null);

  useEffect(() => {
    const mockData = {
      request_idx: 1,
      request_img: null,
      request_title: "테스트 의뢰 제목입니다",
      request_cost: 15000,
      request_state: "모집",
    };

    setRequestInfo(mockData);
  }, []);

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
      {requestInfo && (
        <View style={styles.headerBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navGo.to("RequestDetail", { item: requestInfo })}
            style={styles.headerContentBox}
          >
            <Image
              source={
                requestInfo.request_img
                  ? {
                    uri: `https://traguild.kro.kr/api/requestInfo/getImage/${requestInfo.request_idx}`,
                  }
                  : require("resources/img/defaultImg").logo
              }
              style={styles.headerImg}
            />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>
                {getTitle(requestInfo.request_title, 16)}
              </Text>
              <Text style={styles.headerCost}>
                {getCost(requestInfo.request_cost)} 원
              </Text>
            </View>
            <View style={styles.headerRight}>
              <RequestState text={requestInfo.request_state} />
              {requestInfo.request_state !== "완료" && (
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => toast.show("승인 기능")}
                >
                  <Text style={styles.approveText}>승인</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}

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
  headerBox: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: theme["default-border"],
    backgroundColor: "#fff",
  },
  headerContentBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  headerCost: {
    fontSize: 14,
    color: "gray",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  approveButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: theme["default-btn"],
    borderRadius: 6,
  },
  approveText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  chatContainer: {
    flex: 1,
    marginTop: 4,
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
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ChatDetail;
