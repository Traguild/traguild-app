import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API } from "config/fetch.config";
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { getTitle, getCost } from "resources/js/common";

import RequestState from "components/01-home/RequestState";
import UserRate from "components/03-chat/UserRate";

const ChatHeader = ({
  requestInfo,
  onPress,
  onApprove,
  onComplete,
  showApproveButton = true,
}) => {
  const [currentUserIdx, setCurrentUserIdx] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [RequestInfo, setRequestInfo] = useState(requestInfo);
  const [reservedDate, setReservedDate] = useState(requestInfo?.reserved_start_time);

  useEffect(() => {
    AsyncStorage.getItem("user_idx").then((id) => setCurrentUserIdx(id));
  }, []);

  useEffect(() => {
    setRequestInfo(requestInfo);
  }, [requestInfo]);

  if (!RequestInfo) return null;

  const isRequester =
    parseInt(currentUserIdx) === parseInt(RequestInfo.user_idx);
  const isApplicant =
    parseInt(currentUserIdx) === parseInt(RequestInfo.applicant_idx);
  const requestState = RequestInfo.request_state ?? "모집";

  const targetUserIdx = useMemo(() => {
    if (!RequestInfo) return null;
    if (isRequester) return RequestInfo?.opponent_user_idx;
    if (isApplicant) return RequestInfo?.user_idx;
    return null;
  }, [RequestInfo, isRequester, isApplicant]);

  const showCompleteButton =
    showApproveButton &&
    requestState === "진행중" &&
    !!RequestInfo.applicant_idx &&
    (
      (isRequester && parseInt(RequestInfo.applicant_idx) === parseInt(targetUserIdx)) ||
      (isApplicant && parseInt(currentUserIdx) === parseInt(RequestInfo.applicant_idx))
    );

  const handleConfirmApplicant = () => setShowDatePicker(true);

  const handleDateChange = async (event, date) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    setShowDatePicker(false);

    try {
      await API.POST({
        url: "/requestInfo/update",
        data: {
          request_idx: RequestInfo.request_idx,
          reserved_start_time: formattedDate,
          request_state: "진행중",
          applicant_idx: targetUserIdx,
        },
      });

      await API.POST({
        url: "/requestApplicant/rejectAll",
        data: {
          request_idx: RequestInfo.request_idx,
        },
      });

      setReservedDate(formattedDate);

      if (onApprove) {
        onApprove({
          reserved_start_time: formattedDate,
          request_state: "진행중",
          applicant_idx: targetUserIdx,
        });
      }
    } catch (error) {
      console.error("날짜 저장 실패", error);
    }
  };

  const handleComplete = async () => {
    try {
      await API.POST({
        url: "/requestInfo/update",
        data: {
          request_idx: RequestInfo.request_idx,
          request_state: "완료",
        },
      });

      setRequestInfo((prev) => ({
        ...prev,
        request_state: "완료",
      }));

      if (onComplete) onComplete("완료");
      setShowRateModal(true);
    } catch (error) {
      console.error("의뢰 완료 실패", error);
    }
  };

  return (
    <View style={styles.headerBox}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.headerContentBox}
      >
        <Image
          source={
            RequestInfo.request_img
              ? {
                uri: `https://traguild.kro.kr/api/requestInfo/getImage/${RequestInfo.request_idx}`,
              }
              : defaultImg.logo
          }
          style={styles.headerImg}
        />

        <View style={styles.headerContent}>
          <RequestState text={requestState} />

          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>
              {getTitle(RequestInfo.request_title ?? "제목 없음", 16)}
            </Text>

            {isRequester && showApproveButton && requestState === "모집" && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleConfirmApplicant}
              >
                <Text style={styles.actionButtonText}>지원자 확정</Text>
              </TouchableOpacity>
            )}

            {showCompleteButton && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleComplete}
              >
                <Text style={styles.actionButtonText}>의뢰 완료</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.costRow}>
            <Text style={styles.headerCost}>
              {getCost(RequestInfo.request_cost ?? 0)} 원
            </Text>

            {reservedDate && (
              <Text style={styles.dateText}>
                예약일: {reservedDate}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showRateModal && targetUserIdx && (
        <UserRate
          visible={showRateModal}
          onClose={() => setShowRateModal(false)}
          targetUserIdx={targetUserIdx}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerCost: {
    fontSize: 14,
    color: "gray",
  },
  dateText: {
    fontSize: 13,
    color: theme["default-text"],
    marginTop: 6,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme["default-btn"],
    borderRadius: 6,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ChatHeader;
