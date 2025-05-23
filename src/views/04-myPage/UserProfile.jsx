import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import MyManner from "components/04-myPage/MyManner";
import RequestItem from "components/01-home/RequestItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile = () => {
  const route = useRoute();
  const { user_idx } = route.params;
  const USER_IDX = useRef(null);

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
      <Text style={styles.nickname}>
        {profile.user_nickname}
        <MyManner
          rate={profile.user_rate ?? 50}
          descript={true}
          size={20}
          style={{ marginLeft: 10, marginTop: 10 }}
        />
      </Text>

      {/* <View
        style={{
          flexDirection: "row",
          marginBottom: 25,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "500", color: "gray" }}>응답률:</Text>
        <Text style={{ marginLeft: 5, color: "gray" }}>
          {profile.responseRate === -1
            ? "데이터가 부족합니다."
            : `${profile.responseRate}%`}
        </Text>
      </View> */}

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
    fontSize: 24,
    fontWeight: "bold",
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
