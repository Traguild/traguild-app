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
import { useToast } from "react-native-toast-notifications";

const RequestComment = ({ navigation, route }) => {
  const toast = useToast();
  const { request_idx } = route.params;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("알 수 없음");

  const fetchUserNick = async (user_idx) => {
    try {
      const res = await API.POST({
        url: "/userInfo",
        data: { user_idx },
      });
      return res?.user_nickname || `유저 ${user_idx}`;
    } catch (error) {
      console.error("user_nickname 조회 실패:", error);
      return `유저 ${user_idx}`;
    }
  };

  const fetchComments = async () => {
    try {
      const res = await API.POST({
        url: "/requestComment",
        data: { request_idx },
      });

      if (Array.isArray(res)) {
        const commentsWithNick = await Promise.all(
          res.map(async (cmt) => {
            const nick = await fetchUserNick(cmt.user_idx);
            return { ...cmt, user_nick: nick };
          })
        );
        setComments(commentsWithNick);
      } else {
        setComments([]);
      }
    } catch (e) {
      console.error("댓글 목록 불러오기 실패:", e);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "댓글",
      headerTintColor: theme["default-btn"],
    });

    const init = async () => {
      const storedId = await AsyncStorage.getItem("user_idx");
      setUserId(storedId);

      try {
        const userRes = await API.POST({
          url: "/userInfo",
          data: { user_idx: storedId },
        });

        if (userRes?.user_nickname) {
          setUserNick(userRes.user_nickname);
        }

        await fetchComments();
      } catch (e) {
        console.error("초기 데이터 불러오기 실패:", e);
      }
    };

    init();
  }, []);

  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await API.PUT({
        url: "/requestComment",
        data: {
          user_idx: userId,
          request_idx: request_idx,
          comment: newComment.trim(),
        },
      });

      if (res?.comment_idx) {
        const newItem = {
          comment_idx: res.comment_idx,
          user_idx: userId,
          user_nick: userNick,
          comment: newComment.trim(),
        };

        setComments((prev) => [...prev, newItem]);
        setNewComment("");
        toast.show("댓글이 등록되었습니다.", { type: "success" });
      } else {
        toast.show("댓글 등록에 실패했습니다.", { type: "danger" });
      }
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      toast.show("댓글 등록 중 오류 발생", { type: "danger" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        data={comments}
        keyExtractor={(item) => item.comment_idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text style={styles.user}>{item.user_nick}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
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
    padding: 10,
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
