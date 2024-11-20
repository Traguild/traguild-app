import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";
import TextField from "components/common/TextField";

const WriteRequest = ({ navigation }) => {
  const [request_title, setTitle] = useState("");
  const [request_content, setContent] = useState("");
  const [request_cost, setCost] = useState("");
  const [image, setImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      // headerStyle: { backgroundColor: theme["tab-active"] },
      headerTintColor: theme["default-btn"],
    });
  });

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
        <Label style={{ width: "20%", marginBottom: 15 }} text="제목" />
        <Input
          style={{ width: "80%" }}
          placeholder="제목을 입력해주세요"
          value={request_title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "20%", marginBottom: 15 }} text="가격" />
        <Input
          style={{ width: "80%" }}
          placeholder="가격을 제시해주세요"
          value={request_cost}
          onChangeText={(text) => setCost(text)}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Label style={{ width: "20%", marginBottom: 15 }} text="내용" />
        <TextField
          style={{ width: "80%" }}
          placeholder="내용을 입력해주세요"
          value={request_content}
          onChangeText={(text) => setContent(text)}
        />
      </View>

      <Button
        style={{ marginTop: 15 }}
        text="작성하기"
        onPress={handlePostRequest}
      />
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
  },
});

export default WriteRequest;
