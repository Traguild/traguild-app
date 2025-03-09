import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// 더미 채팅 데이터
const dummyMessages = [
    { id: "1", sender: "me", text: "안녕하세요!" },
    { id: "2", sender: "other", text: "네, 안녕하세요!" },
    { id: "3", sender: "me", text: "오늘 만날 수 있을까요?" },
    { id: "4", sender: "other", text: "네, 가능합니다!" },
];

const ChatDetail = () => {
    const route = useRoute();
    const { chatData } = route.params;
    const [messages, setMessages] = useState(dummyMessages);
    const [inputText, setInputText] = useState("");

    const sendMessage = () => {
        if (inputText.trim().length === 0) return;
        const newMessage = { id: Date.now().toString(), sender: "me", text: inputText };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText("");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.sender === "me" ? styles.myMessage : styles.otherMessage,
                        ]}
                    >
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end", padding: 10 }}
                inverted
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="메시지를 입력하세요..."
                    placeholderTextColor={theme["default-border"]}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>전송</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme["home-bg"],
    },
    messageContainer: {
        padding: 12,
        borderRadius: 15,
        marginVertical: 5,
        maxWidth: "75%",
    },
    myMessage: {
        alignSelf: "flex-end",
        backgroundColor: theme["request-proceed"],
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: theme["apply-bg"],
    },
    messageText: {
        fontSize: 16,
        color: theme["apply-text"],
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: theme["default-border"],
        backgroundColor: theme["input-field"],
    },
    textInput: {
        flex: 1,
        borderRadius: 15,
        padding: 12,
        backgroundColor: theme["input-field"],
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: theme["default-btn"],
    },
    sendButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default ChatDetail;
