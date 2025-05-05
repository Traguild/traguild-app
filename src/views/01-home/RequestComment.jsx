import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "resources/theme/common";
import { API } from "config/fetch.config";

const RequestComment = ({ navigation, route }) => {
  const { request_idx } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("알 수 없음");


  useEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      headerTintColor: theme["default-btn"],
    });

    const fetchUserId = async () => {
      const storedId = await AsyncStorage.getItem("user_idx");
      setUserId(storedId);

      try {
        const res = await API.POST({
          url: "/userInfo",
          data: { user_idx: storedId },
        });

        if (res?.user_nickname) {
          setUserNick(res.user_nickname);
        }
      } catch (e) {
        console.error("유저 정보 가져오기 실패:", e);
      }
    };

    fetchUserId();
  }, []);

  const addComment = () => {
    if (!newComment.trim()) return;

    const newItem = {
      comment_idx: Date.now(),
      user_idx: userId,
      user_nick: userNick,
      comment: newComment.trim(),
    };

    setComments(prev => [...prev, newItem]);
    setNewComment("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={comments}
        keyExtractor={(item) => item.comment_idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text style={styles.user}>
              {item.user_nick ? `${item.user_nick}` : `유저 ${item.user_idx}`}
            </Text>
            <Text>{item.comment}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingTop: 100, paddingHorizontal: 16, paddingBottom: 10 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="댓글을 입력하세요"
          placeholderTextColor={theme["default-border"]}
        />
        <TouchableOpacity onPress={addComment} style={styles.sendButton}>
          <Text style={{ color: "#fff" }}>등록</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RequestComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  commentBox: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme["default-border"],
    paddingBottom: 8,
  },
  user: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: theme["default-border"],
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: theme["default-btn"],
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 6,
  },
});
