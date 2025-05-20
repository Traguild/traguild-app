import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { io } from "socket.io-client";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORT CONFIGS
import { API } from "config/fetch.config";
import { theme } from "resources/theme/common";
import ChatHeader from "components/03-chat/ChatHeader";

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
  const { chatData, section } = route.params;
  const chatRoomIdx = chatData?.chat_room_idx;
  const USER_IDX = useRef(null);

  const [messages, setMessages] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [inputText, setInputText] = useState("");
  const [requestInfo, setRequestInfo] = useState(null);

  // 💬 채팅방 정보와 requestInfo 불러오기
  const fetchRoomAndRequestInfo = async () => {
    try {
      const roomRes = await API.POST({
        url: "/chatRoom",
        data: { chat_room_idx: chatRoomIdx },
      });

      const requestIdx = roomRes?.[0]?.request_idx;

      if (requestIdx) {
        const requestRes = await API.POST({
          url: "/requestInfo",
          data: { request_idx: requestIdx },
        });

        if (Array.isArray(requestRes) && requestRes.length > 0) {
          setRequestInfo(requestRes[0]);
        } else {
          console.error("요청 정보 없음");
        }
      } else {
        console.error("chatRoom에서 request_idx를 못 가져옴");
      }
    } catch (error) {
      console.error("방 정보 및 요청 정보 가져오기 실패", error);
    }
  };

  const getMsgData = useCallback(async () => {
    USER_IDX.current = await AsyncStorage.getItem("user_idx");

    try {
      const res = await API.POST({
        url: "/chatMessage/room",
        data: { chat_room_idx: chatRoomIdx },
      });

      if (Array.isArray(res)) {
        const parsed = res.map((msg) => ({
          id: parseInt(msg.user_idx),
          msg: msg.chat_detail,
          room: msg.chat_room_idx,
          time: msg.send_time?.split("T")[1]?.slice(0, 5) || "00:00",
        }));

        parsed.reverse();
        setMessages(parsed);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("채팅 데이터 가져오기 실패:", error);
      setMessages([]);
    }
  }, [chatRoomIdx]);

  useFocusEffect(
    useCallback(() => {
      fetchRoomAndRequestInfo();
      getMsgData();
    }, [getMsgData])
  );

  useEffect(() => {
    socket.emit("enter_room", { room: chatRoomIdx });

    socket.on("chatting", (data) => {
      setMessages((prevMessages) => [data, ...prevMessages]);
    });

    return () => {
      socket.off("chatting");
    };
  }, [chatRoomIdx]);

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    const user_idx = USER_IDX.current;
    const newMessage = {
      id: user_idx,
      msg: inputText,
      room: chatRoomIdx,
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
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme["input-field"] }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 90}
      enabled={enabled}
      onFocus={() => setEnabled(true)}
      onBlur={() => setEnabled(false)}
    >
      <View style={styles.container}>
        {requestInfo && (
          <ChatHeader
            requestInfo={requestInfo}
            onPress={() => navGo.to("RequestDetail", { item: requestInfo })}
            onApprove={() => {
              setRequestInfo((prev) => ({ ...prev, request_state: "진행중" }));
            }}
            onComplete={() => {
              setRequestInfo((prev) => ({ ...prev, request_state: "완료" }));
            }}
          />
        )}

        <FlatList
          ref={flatListRef}
          style={{ width: "100%" }}
          inverted
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
        />
        <View style={styles.inputContainer}>
          {section.title == "취소" || section.title == "완료" ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: theme["default-btn"],
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                요청이 {section.title}된 채팅방입니다.
              </Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="메시지를 입력하세요..."
                placeholderTextColor={theme["default-border"]}
                onFocus={handleScrollToEnd}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Text style={styles.sendButtonText}>전송</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["home-bg"],
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
    height: 50,
    backgroundColor: theme["input-field"],
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    height: 45,
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
