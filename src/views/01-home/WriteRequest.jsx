import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const WriteRequest = () => {
    const [request_title, setTitle] = useState("");
    const [request_content, setContent] = useState("");
    const [request_cost, setCost] = useState("");
    const [image, setImage] = useState(null);

    const handleImagePicker = () => {
        // 이미지 선택 로직 추가 예정
    };

    const handlePostRequest = () => {
        // 글쓰기 로직 추가 예정
        alert("글이 작성되었습니다.");
        navGo.back();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
                <Text style={styles.imagePickerText}>이미지 선택</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>제목 :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="제목을 입력해주세요"
                    value={request_title}
                    onChangeText={(text) => setTitle(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>내용 :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="내용을 입력해주세요"
                    value={request_content}
                    onChangeText={(text) => setContent(text)}
                    multiline
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>가격 :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="가격을 제시해주세요"
                    value={request_cost}
                    onChangeText={(text) => setCost(text)}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.postButton} onPress={handlePostRequest}>
                <Text style={styles.postButtonText}>글 작성하기</Text>
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
    imagePicker: {
        backgroundColor: theme["default-btn"],
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    imagePickerText: {
        color: "white",
        fontSize: 16,
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
        width: 60,
        textAlign: "right",
    },
    input: {
        backgroundColor: "white",
        flex: 1,
        padding: 20,
        borderRadius: 10,
        fontSize: 16,
    },
    postButton: {
        backgroundColor: theme["default-btn"],
        width: "100%",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    postButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    },
});

export default WriteRequest;