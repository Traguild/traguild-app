import React from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "resources/theme/common";

const UserRate = ({ visible, onClose, targetUserIdx }) => {
    const handleRate = async (delta) => {
        try {
            const userInfo = await API.POST({
                url: "/userInfo",
                data: { user_idx: targetUserIdx },
            });

            if (!userInfo || typeof userInfo.user_rate !== "number") {
                console.warn("사용자 정보를 가져올 수 없습니다.");
                return;
            }

            const updatedRate = userInfo.user_rate + delta;

            const res = await API.PUT({
                url: "/userInfo/update",
                data: {
                    user_idx: targetUserIdx,
                    user_rate: updatedRate,
                    is_agree_privacy: true
                },
            });

            if (!res?.success) {
                console.warn("평가 처리에 실패했습니다.");
            }
        } catch (error) {
            console.error("평가 API 오류:", error);
        } finally {
            onClose();
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>상대방을 평가해주세요</Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => handleRate(1)}>
                            <MaterialCommunityIcons
                                name="thumb-up-outline"
                                size={40}
                                color={theme["default-btn"]}
                            />
                            <Text style={styles.label}>좋아요</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton} onPress={() => handleRate(-1)}>
                            <MaterialCommunityIcons
                                name="thumb-down-outline"
                                size={40}
                                color="tomato"
                            />
                            <Text style={styles.label}>싫어요</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>닫기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default UserRate;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
    },
    iconButton: {
        alignItems: "center",
    },
    label: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "500",
    },
    closeButton: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 8,
    },
    closeText: {
        fontSize: 14,
        color: "#333",
    },
});
