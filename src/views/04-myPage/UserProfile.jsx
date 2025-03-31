import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const UserProfile = () => {
    const route = useRoute();
    const { user_idx } = route.params;

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.POST({
                    url: "/userInfo",
                    data: {
                        user_idx: user_idx,
                    },
                });
                const res1 = await API.POST({
                    url: "/requestInfo/howManyAccept",
                    data: {
                        user_idx
                    },
                });

                const res2 = await API.POST({
                    url: "/requestApplicant/getFinished",
                    data: {
                        user_idx: user_idx,
                    },
                });

                const fetchedProfile = {
                    user_nickname: res.user_nickname,
                    user_rate: res.user_rate,
                    completedRequests: res1 || [],
                    postedRequests: res2 || [],
                    responseRate: res.responseRate || 0,
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
            <ScrollView contentContainerStyle={styles.innerContainer}>
                <Text style={styles.nickname}>
                    {profile.user_nickname}
                </Text>

                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>완료한 의뢰 ({profile.completedRequests.length})</Text>
                    {profile.completedRequests.map((item) => (
                        <Text key={item.id} style={styles.itemText}>- {item.applicant_intro}</Text>
                    ))}
                </View>

                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>의뢰한 요청 ({profile.postedRequests.length})</Text>
                    {profile.postedRequests.map((item) => (
                        <Text key={item.id} style={styles.itemText}>- {item.request_title}</Text>
                    ))}
                </View>

                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>응답률</Text>
                    <Text style={styles.metricText}>{profile.responseRate}%</Text>
                </View>

                <View style={styles.sectionBox}>
                    <Text style={styles.sectionTitle}>평가도</Text>
                    <Text style={styles.metricText}>{profile.user_rate} / 100</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme["home-bg"],
    },
    innerContainer: {
        padding: 20,
    },
    nickname: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: theme["default-text"],
    },
    sectionBox: {
        marginBottom: 20,
        padding: 15,
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
        marginBottom: 10,
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
});

export default UserProfile;
