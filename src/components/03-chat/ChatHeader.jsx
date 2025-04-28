import React, { useEffect, useState } from "react";
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

// IMPORT CONFIGS
import { API } from "config/fetch.config";
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";
import { getTitle, getCost } from "resources/js/common";

// IMPORT COMPONENTS
import RequestState from "components/01-home/RequestState";
import UserRate from "components/03-chat/UserRate";

const ChatHeader = ({ requestInfo, onPress, onApprove, onComplete, showApproveButton = true }) => {
    const [currentUserIdx, setCurrentUserIdx] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("user_idx").then((id) => setCurrentUserIdx(id));
    }, []);

    if (!requestInfo) return null;

    const isRequester = parseInt(currentUserIdx) === parseInt(requestInfo.user_idx);
    const isApplicant = parseInt(currentUserIdx) === parseInt(requestInfo.applicant_idx);
    const requestState = requestInfo.request_state ?? "모집";
    const requestDate = requestInfo.request_date;

    const handleConfirmApplicant = () => setShowDatePicker(true);

    const handleDateChange = async (event, date) => {
        if (event.type === "dismissed") {
            setShowDatePicker(false);
            return;
        }

        const formattedDate = date.toISOString().split("T")[0];
        setShowDatePicker(false);

        try {
            await API.PUT({
                url: "/requestInfo/update",
                data: {
                    request_idx: requestInfo.request_idx,
                    request_date: formattedDate,
                    request_state: "진행중",
                },
            });
            if (onApprove) onApprove("진행중");
        } catch (error) {
            console.error("날짜 저장 실패", error);
        }
    };

    const handleComplete = async () => {
        try {
            await API.PUT({
                url: "/requestInfo/update",
                data: {
                    request_idx: requestInfo.request_idx,
                    request_state: "완료",
                },
            });
            if (onComplete) onComplete("완료");
            setShowRateModal(true);
        } catch (error) {
            console.error("의뢰 완료 실패", error);
        }
    };

    return (
        <View style={styles.headerBox}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.headerContentBox}>
                <Image
                    source={requestInfo.request_img
                        ? { uri: `https://traguild.kro.kr/api/requestInfo/getImage/${requestInfo.request_idx}` }
                        : defaultImg.logo
                    }
                    style={styles.headerImg}
                />

                <View style={styles.headerContent}>
                    <RequestState text={requestState} />
                    <Text style={styles.headerTitle}>{getTitle(requestInfo.request_title ?? "제목 없음", 16)}</Text>
                    <Text style={styles.headerCost}>{getCost(requestInfo.request_cost ?? 0)} 원</Text>
                </View>

                <View style={styles.headerRight}>
                    {isRequester && showApproveButton && requestState === "모집" && (
                        <TouchableOpacity style={styles.actionButton} onPress={handleConfirmApplicant}>
                            <Text style={styles.actionButtonText}>지원자 확정</Text>
                        </TouchableOpacity>
                    )}

                    {isRequester && showApproveButton && requestState === "진행중" && (
                        <TouchableOpacity style={styles.actionButton} onPress={handleComplete}>
                            <Text style={styles.actionButtonText}>의뢰 완료</Text>
                        </TouchableOpacity>
                    )}

                    {isApplicant && requestState === "진행중" && requestDate && (
                        <Text style={styles.dateText}>예약일: {requestDate}</Text>
                    )}
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

            <UserRate
                visible={showRateModal}
                onClose={() => setShowRateModal(false)}
                targetUserIdx={requestInfo?.applicant_idx}
            />
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
    actionButton: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        backgroundColor: theme["default-btn"],
        borderRadius: 6,
    },
    actionButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    dateText: {
        fontSize: 14,
        color: theme["default-text"],
    },
});

export default ChatHeader;
