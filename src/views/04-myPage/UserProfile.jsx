import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import * as Progress from "react-native-progress";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import MyManner from "components/04-myPage/MyManner";
import RequestItem from "components/01-home/RequestItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      headerTintColor: theme["default-btn"],
    });
  });

  const route = useRoute();
  const { user_idx } = route.params;
  const USER_IDX = useRef(null);
  const [user_exp, setUserExp] = useState(0);
  const [user_level, setUserLevel] = useState(1);
  const [user_title, setUserTitle] = useState("신입 모험가");

  const [profile, setProfile] = useState({
    user_nickname: "",
    user_rate: 0,
    completedRequests: [],
    postedRequests: [],
    responseRate: -1,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        USER_IDX.current = AsyncStorage.getItem("user_idx");
        const res = await API.POST({
          url: "/userInfo",
          data: { user_idx },
        });

        const res1 = await API.POST({
          url: "/requestApplicant/getFinished",
          data: { user_idx },
        });

        const res2 = await API.POST({
          url: "/requestInfo/howManyRequest",
          data: { user_idx },
        });
        const res3 = await API.POST({
          url: "/requestInfo/onlymine",
          data: {
            user_idx,
            page: 1,
            limit: 2,
          },
        });

        setUserExp(res.user_exp || 0);
        setUserLevel(res.user_level || 1);
        setUserTitle(res.user_title || "신입 모험가");

        const fetchedProfile = {
          user_nickname: res.user_nickname,
          user_rate: res.user_rate,
          completedRequests: res1 || [],
          postedAmounts: res2 || 0,
          postedRequests: res3 || [],
          responseRate: res.responseRate || -1,
        };

        setProfile(fetchedProfile);
      } catch (error) {
        console.error("프로필 불러오기 실패", error);
      }
    };

    fetchProfile();
  }, [user_idx]);

  if (!profile) return null;

  return (
    <SafeAreaView style={styles.container}>
      <MyManner
        rate={profile.user_rate ?? 50}
        descript={true}
        size={18}
        style={{ marginTop: 5 }}
      />
      <Text style={styles.nickname}>
        <Text style={{ color: theme[`user_lv${user_level}`], fontSize: 16 }}>
          {`Lv ${user_level}. ${user_title}  `}
        </Text>
        {profile.user_nickname}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Progress.Bar
          width={330}
          height={10}
          color={theme["request-done"]}
          unfilledColor={"#e0e0e0"}
          borderColor={"darkgreen"}
          borderRadius={5}
          marginBottom={20}
          progress={user_exp / (3 * user_level)}
          animationType="timing"
          animated={true}
          useNativeDriver={true}
          duration={500}
        />
        <Text
          style={{
            color: theme["request-done"],
            fontWeight: "600",
            fontSize: 12,
            marginLeft: 10,
          }}
        >
          {((user_exp / (3 * user_level)) * 100).toFixed(1)}%
        </Text>
      </View>

      <View style={styles.sectionBox}>
        <View style={styles.titleBox}>
          <Text style={styles.sectionTitle}>
            완료한 의뢰 ({profile.completedRequests.length})
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              null;
            }}
          >
            <Text
              style={[
                styles.sectionTitle,
                { fontSize: 14, color: "gray", fontWeight: "400" },
              ]}
            >
              더 보기
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ width: "100%" }}
          data={profile.completedRequests}
          renderItem={({ item }) => <RequestItem item={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyItems}>완료한 의뢰가 없습니다.</Text>
          }
          keyExtractor={(item) => item.request_idx.toString()}
        />
      </View>

      <View style={styles.sectionBox}>
        <View style={styles.titleBox}>
          <Text style={[styles.sectionTitle]}>
            등록한 의뢰 ({profile.postedAmounts})
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navGo.to("QuestList", { user_idx });
            }}
          >
            <Text
              style={[
                styles.sectionTitle,
                { fontSize: 14, color: "gray", fontWeight: "400" },
              ]}
            >
              더 보기
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ width: "100%" }}
          data={profile.postedRequests}
          renderItem={({ item }) => <RequestItem item={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyItems}>등록된 의뢰가 없습니다.</Text>
          }
          keyExtractor={(item) => item.request_idx.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["home-bg"],
    padding: 20,
  },
  nickname: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: theme["default-text"],
  },
  titleBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.7,
    borderBottomColor: "lightgray",
    marginBottom: 10,
  },
  sectionBox: {
    marginBottom: 10,
    padding: 0,
    justifyContent: "space-between",

    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    padding: 15,
  },
  itemText: {
    fontSize: 14,
    color: theme["default-text"],
    marginBottom: 5,
  },
  metricText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme["default-btn"],
  },
  emptyItems: {
    alignSelf: "center",
    color: "gray",
    marginTop: 20,
    marginBottom: 30,
  },
});

export default UserProfile;
