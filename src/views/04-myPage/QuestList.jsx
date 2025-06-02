import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import RequestItem from "components/01-home/RequestItem";

const LIMIT = 10;

const QuestList = ({ navigation }) => {
  let page = 1;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "의뢰 내역",
      headerTintColor: theme["default-btn"],
    });
  }, [navigation]);

  const [mainFilter, setMainFilter] = useState("등록한 의뢰");
  const [requests, setRequests] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    const fetchDatas = async () => {
      setIsLoading(true);
      const user_idx = await AsyncStorage.getItem("user_idx");

      const fetchRequests = async () => {
        try {
          const res = await API.POST({
            url: "/requestInfo/onlyMine",
            data: { user_idx, page, limit: LIMIT },
          });
          setRequests(res);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchApplications = async () => {
        try {
          const res = await API.POST({
            url: "/requestApplicant/applyRequest",
            data: { user_idx, page, limit: LIMIT },
          });
          setApplications(res);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchApplications();
      fetchRequests();
    };

    fetchDatas();
  }, []);

  const handleDismissMenu = () => {
    if (activeMenuId !== null) {
      setActiveMenuId(null);
    }
  };

  const filteredMainData =
    mainFilter === "등록한 의뢰" ? requests : applications;

  return (
    <TouchableWithoutFeedback onPress={handleDismissMenu}>
      <View style={styles.container}>
        <View style={styles.mainFilterContainer}>
          {["등록한 의뢰", "지원한 의뢰"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.mainFilterButton,
                mainFilter === filter && styles.activeMainFilterButton,
              ]}
              onPress={() => setMainFilter(filter)}
            >
              <Text
                style={
                  mainFilter === filter
                    ? styles.focusedMainFilterText
                    : styles.mainFilterText
                }
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <Text style={styles.loadingText}>데이터를 불러오는 중입니다...</Text>
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={filteredMainData}
            renderItem={({ item }) => {
              let statusLabel = "";

              if (mainFilter === "지원한 의뢰") {
                if (item.is_canceled === 1) {
                  statusLabel = "취소";
                } else if (item.applicant_state === "반려") {
                  statusLabel = "반려";
                } else if (item.applicant_state === "승인") {
                  statusLabel = "승인";
                } else {
                  statusLabel = "대기";
                }
              }

              return (
                <RequestItem
                  item={item}
                  isOwner={mainFilter === "등록한 의뢰"}
                  isMenuVisible={activeMenuId === item.request_idx}
                  onToggleMenu={() =>
                    setActiveMenuId(
                      activeMenuId === item.request_idx ? null : item.request_idx
                    )
                  }
                  statusLabel={statusLabel}
                />
              );
            }}
            keyExtractor={(item) =>
              mainFilter === "등록한 의뢰"
                ? item.request_idx.toString()
                : item.id.toString()
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>데이터를 불러올 수 없습니다.</Text>
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  mainFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeMainFilterButton: {
    backgroundColor: theme["filter-btn"],
  },
  mainFilterText: {
    color: "black",
  },
  focusedMainFilterText: {
    color: "white",
    fontWeight: "600",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});

export default QuestList;
