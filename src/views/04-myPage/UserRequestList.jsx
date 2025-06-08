import React, { useEffect, useState, useLayoutEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORT COMPONENTS
import RequestItem from "components/01-home/RequestItem";

// IMPORT CONFIGS
import { API } from "config/fetch.config";
import { theme } from "resources/theme/common";

const UserRequestList = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { user_idx, type } = route.params;

    const [userNickname, setUserNickname] = useState("");
    const [data, setData] = useState([]);

    const title = type === "posted" ? "등록한 의뢰" : "지원한 의뢰";

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerBackTitle: null,
            headerTintColor: theme["default-btn"],
        });
    }, [navigation]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await API.POST({
                    url: "/userInfo",
                    data: { user_idx },
                });

                setUserNickname(userRes.user_nickname);

                if (type === "posted") {
                    const res = await API.POST({
                        url: "/requestInfo/onlyMine",
                        data: { user_idx, page: 1, limit: 20 },
                    });
                    setData(res);
                } else if (type === "applied") {
                    const res = await API.POST({
                        url: "/requestApplicant/applyRequest",
                        data: { user_idx, page: 1, limit: 20 },
                    });
                    setData(res);
                }
            } catch (error) {
                console.error("데이터 불러오기 실패", error);
            }
        };

        fetchData();
    }, [user_idx, type]);

    return (
        <SafeAreaView style={styles.container}>
            {userNickname !== "" && (
                <Text style={styles.title}>{userNickname}님의 {title}</Text>
            )}
            <FlatList
                data={data}
                keyExtractor={(item) =>
                    (type === "posted" ? item.request_idx : item.id).toString()
                }
                renderItem={({ item }) => (
                    <RequestItem
                        item={item}
                        isOwner={type === "posted"}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>표시할 의뢰가 없습니다.</Text>
                }
            />
        </SafeAreaView>
    );
};

export default UserRequestList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme["home-bg"],
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 15,
        color: theme["default-text"],
    },
    emptyText: {
        textAlign: "center",
        marginTop: 30,
        color: "gray",
    },
});
