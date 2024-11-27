import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { API } from "config/fetch.config";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";
import TextField from "components/common/TextField";

const WriteRequest = ({ navigation }) => {
  const toast = useToast();
  const [request_title, setTitle] = useState("");
  const [request_content, setContent] = useState("");
  const [request_cost, setCost] = useState(0);
  const [image, setImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      headerTintColor: theme["default-btn"],
    });
  });

  const handleImagePicker = () => {
    // 이미지 선택 로직 추가 예정
  };

  const handlePostRequest = () => {
    API.PUT({
      url: "/requestInfo",
      data: {
        user_idx: 1,
        request_title,
        request_content,
        request_cost,
      },
    });
    toast.show("글이 작성되었습니다.");
    navGo.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
          <Text style={styles.imagePickerText}>이미지 선택</Text>
        </TouchableOpacity>

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

        <Button
          style={{ marginTop: 15 }}
          text="작성하기"
          onPress={handlePostRequest}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  imagePicker: {
    backgroundColor: theme["default-btn"],
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePickerText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
  },
});

export default WriteRequest;
