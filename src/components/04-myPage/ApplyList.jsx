import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";

// DUMMY DATA FOR DEMO
const dummyData = [
    {
        request_idx: 1,
        request_title: "청소 도와주세요",
        user_nick: "홍길동",
        request_cost: "20,000",
        applyIntro: "청소 잘 합니다!",
        status: "pending",
    },
    {
        request_idx: 2,
        request_title: "가구 조립 도와주세요",
        user_nick: "김철수",
        request_cost: "30,000",
        applyIntro: "조립 경험이 많습니다.",
        status: "pending",
    },
    {
        request_idx: 3,
        request_title: "가구 조립 도와주세요",
        user_nick: "김철수",
        request_cost: "30,000",
        applyIntro: "조립 경험이 많습니다.",
        status: "pending",
    },
    {
        request_idx: 4,
        request_title: "가구 조립 도와주세요",
        user_nick: "김철수",
        request_cost: "30,000",
        applyIntro: "조립 경험이 많습니다.",
        status: "pending",
    },
    {
        request_idx: 5,
        request_title: "가구 조립 도와주세요",
        user_nick: "김철수",
        request_cost: "30,000",
        applyIntro: "조립 경험이 많습니다.",
        status: "pending",
    },
];

const ApplyList = () => {
    const [applyList, setApplyList] = useState(dummyData);

    const handleApprove = (idx) => {
        const updatedList = applyList.map((item) =>
            item.request_idx === idx ? { ...item, status: "approved" } : item
        );
        setApplyList(updatedList);
    };

    const handleReject = (idx) => {
        const updatedList = applyList.map((item) =>
            item.request_idx === idx ? { ...item, status: "rejected" } : item
        );
        setApplyList(updatedList);
    };

    const renderItem = ({ item }) => (
        <View key={item.request_idx} style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <Text style={styles.title}>{item.request_title}</Text>
                <View style={styles.subtitleRow}>
                    <Text style={styles.subtitle}>{item.user_nick}</Text>
                    <Text style={styles.subtitle}>{item.request_cost} 원</Text>
                </View>
                <Text style={styles.applyIntro}>{item.applyIntro}</Text>
            </View>
            {item.status === "pending" ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.approveButton]}
                        onPress={() => handleApprove(item.request_idx)}
                    >
                        <Text style={styles.buttonText}>승인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.rejectButton]}
                        onPress={() => handleReject(item.request_idx)}
                    >
                        <Text style={styles.buttonText}>반려</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.statusText}>
                    {item.status === "approved" ? "승인됨" : "반려됨"}
                </Text>
            )}
        </View>
    );

    return (
        <FlatList
            data={applyList}
            renderItem={renderItem}
            keyExtractor={(item) => item.request_idx.toString()}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: theme["home-bg"],
    },
    itemContainer: {
        backgroundColor: theme["apply-bg"],
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme["default-border"],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemContent: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    subtitleRow: {
        flexDirection: "row",
        marginTop: 5,
    },
    subtitle: {
        fontSize: 16,
    },
    applyIntro: {
        fontSize: 16,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,
        borderWidth: 0.5,
        borderColor: theme["default-border"],
    },
    approveButton: {
        backgroundColor: theme["success-btn"],
    },
    rejectButton: {
        backgroundColor: theme["reject-btn"],
    },
    buttonText: {
        color: theme["btn-floating"],
        fontWeight: "bold",
    },
    statusText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: theme["default-btn"],
    },
});

export default ApplyList;