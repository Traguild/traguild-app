import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useToast } from "react-native-toast-notifications";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { defaultImg } from "resources/img/defaultImg";
import { layout } from "resources/theme/layout";
import { Feather } from "@expo/vector-icons";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";
import TextField from "components/common/TextField";


const WriteForm = ({ onSubmit }) => {
    const toast = useToast();
    const [request_title, setTitle] = useState("");
    const [request_content, setContent] = useState("");
    const [request_cost, setCost] = useState(0);


    const getDefaultImage = () => {
        return defaultImg.logo;
    };

    const handleImagePicker = () => {
        // 이미지 선택 로직 추가 예정
    };

    const handleSubmit = () => {
        if (!request_title || !request_content || !request_cost) {
            toast.show("모든 필드를 입력해주세요.", { type: "warning" });
            return;
        }
        onSubmit({ request_title, request_content, request_cost });
    };

    return (
        <View style={styles.container}>
            <View style={{ ...styles.itemImg, width: layout().width, height: layout().width }}>
                <Feather name="image" size={layout().width * 0.1} color="black" />
            </View>

            <View style={styles.inputContainer}>
                <Label style={{ width: "20%" }} text="제목" />
                <Input
                    style={{ width: "100%" }}
                    placeholder="제목을 입력해주세요"
                    value={request_title}
                    onChangeText={(text) => setTitle(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Label style={{ width: "20%" }} text="가격" />
                <Input
                    style={{ width: "100%" }}
                    placeholder="가격을 제시해주세요"
                    value={request_cost}
                    onChangeText={(text) => setCost(text)}
                    keyboardType="number-pad"
                />
            </View>
            <View style={styles.inputContainer}>
                <Label style={{ width: "20%" }} text="내용" />
                <TextField
                    style={{ width: "100%" }}
                    placeholder="내용을 입력해주세요"
                    value={request_content}
                    onChangeText={(text) => setContent(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Button
                    style={{ marginTop: 15, marginBottom: 15 }}
                    text="작성하기"
                    onPress={handleSubmit}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: theme["default-bg"],
    },
    itemImg: {
        marginBottom: 20,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
    imagePicker: {
        backgroundColor: theme["default-btn"],
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: "flex-end",
        marginBottom: 10,
        marginRight: 20,
    },
    imagePickerText: {
        color: "white",
        fontSize: 16,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 20,
    },
});

export default WriteForm;