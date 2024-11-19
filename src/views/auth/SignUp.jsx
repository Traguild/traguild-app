import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

/* IMPORT RESOURCES */
import { theme } from "../../resources/theme/common";

const SignUp = () => {
    const [nickname, setNickname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        alert("회원가입이 완료되었습니다.");
        navGo.to("SignIn");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>회원가입</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>닉네임 :</Text>
                <TextInput
                    style={styles.input}
                    value={nickname}
                    onChangeText={(text) => setNickname(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>이름 :</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>이메일 :</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>비밀번호 :</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>비밀번호 확인 :</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>가입하기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme["default-bg"],
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "white",
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        marginRight: 10,
        width: 100,
        textAlign: "right",
    },
    input: {
        backgroundColor: "white",
        flex: 1,
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: theme["default-btn"],
        width: "100%",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    signUpButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },
});

export default SignUp;