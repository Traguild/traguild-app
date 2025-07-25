import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  SectionList,
  Image,
  Alert,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultImg } from "resources/img/defaultImg";
import RequestState from "components/01-home/RequestState";
import ChatListItem from "components/03-chat/ChatListItem";

const ChatList = ({ navigation }) => {
  const USER_IDX = useRef(null);
  const [userInfo, setUserInfo] = useState({});
  const [grouped, setGrouped] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "내 채팅",
      headerTintColor: theme["default-btn"],
      headerStyle: {
        backgroundColor: theme["default-bg"],
        elevation: 0,
        shadowOpacity: 0,
      },
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        await getUserInfo();
      };
      getData();
    }, [getUserInfo])
  );

  const groupByStatus = (data) => {
    const statusOrder = ["모집", "진행중", "완료", "취소"];
    const isProgress = (d) => {
      return (
        d.request_state === "진행중" &&
        (d.applicant_idx == USER_IDX.current ||
          (d.requested_user_idx == USER_IDX.current &&
            d.user_idx == d.applicant_idx))
      );
    };
    const isDone = (d) => {
      return (
        d.request_state === "완료" &&
        (d.applicant_idx == USER_IDX.current ||
          (d.requested_user_idx == USER_IDX.current &&
            d.user_idx == d.applicant_idx))
      );
    };

    return statusOrder.map((status) => ({
      title: status,
      data: data.filter((d) => {
        let isValid = false;
        if (status === "모집") isValid = d.request_state === "모집";
        else if (status === "진행중") {
          if (isProgress(d)) isValid = d.request_state === "진행중";
        } else if (status === "완료") {
          if (isDone(d)) isValid = d.request_state === "완료";
        } else if (status === "취소") {
          if (!(isProgress(d) || isDone(d)) && d.request_state !== "모집")
            isValid = true;
        }

        if (isValid) {
          setHeaderVisible((prev) => ({ ...prev, [status]: prev[status] + 1 }));
        }
        return isValid;
      }),
    }));
  };

  const [collapsed, setCollapsed] = useState({
    모집: false,
    진행중: false,
    완료: true,
    취소: true,
  });

  const [headerVisible, setHeaderVisible] = useState({
    모집: 0,
    진행중: 0,
    완료: 0,
    취소: 0,
  });

  const renderSectionHeader = ({ section: { title } }) => {
    if (!headerVisible[title]) return null;
    return (
      <TouchableOpacity
        onPress={() =>
          setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }))
        }
        style={styles.sectionHeader}
        activeOpacity={0.7}
      >
        <View>
          <RequestState text={title} />
        </View>
        <Text style={{ color: "gray", fontSize: 10 }}>
          {collapsed[title] ? "(열기) ▶" : "(닫기) ▽"}
        </Text>
      </TouchableOpacity>
    );
  };

  const getUserInfo = async () => {
    USER_IDX.current = await AsyncStorage.getItem("user_idx");
    const user_idx = USER_IDX.current;

    const res = await API.POST({
      url: "/chatList/mine",
      data: { user_idx },
    });

    if (JSON.stringify(res) !== JSON.stringify(userInfo)) {
      setUserInfo(res);
      setGrouped(groupByStatus(res));
    }
  };

  const handleLeave = (item) => {
    Alert.alert(
      `[${item.request_title}] ${item.user_nickname}님과의 채팅방`,
      "정말 나가시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "확인",
          onPress: () => {
            setGrouped((prev) =>
              prev.filter((c) => c.chat_room_idx !== item.chat_room_idx)
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={grouped}
        keyExtractor={(item) => item.chat_room_idx}
        renderItem={({ item, section }) => (
          <ChatListItem
            item={item}
            section={section}
            collapsed={collapsed}
            handleLeave={handleLeave}
          />
        )}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["home-bg"],
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: theme["home-border"],
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChatList;
