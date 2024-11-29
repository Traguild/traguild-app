import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import * as ImagePicker from "expo-image-picker";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { getCost } from "resources/js/common";
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

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState(null);
  const [request_title, setTitle] = useState("");
  const [request_content, setContent] = useState("");
  const [request_cost, setCost] = useState("");

  const getDefaultImage = () => {
    return defaultImg.logo;
  };

  const handleImagePicker = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        toast.show("권한이 없습니다.", { type: "warning" });
        return null;
      }
    }

    console.log("Image Picker");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      return null;
    }
  };

  const handleSubmit = () => {
    if (!request_title || !request_content || !request_cost) {
      toast.show("모든 필드를 입력해주세요.", { type: "warning" });
      return;
    }
    onSubmit({ request_title, request_content, request_cost });
  };

  return (
    <View style={{ ...styles.container, height: layout().height }}>
      <ImageBackground
        source={image ? { uri: image } : getDefaultImage()}
        style={{
          width: layout().width,
          height: layout().width,
        }}
      >
        <Pressable style={styles.itemImg} onPress={handleImagePicker}>
          <Feather name="image" size={layout().width * 0.1} color="lightgray" />
        </Pressable>
      </ImageBackground>

      <View style={styles.inputContainer}>
        <Label text="제목" />
        <Input
          style={{ width: "100%" }}
          placeholder="제목을 입력해주세요"
          value={request_title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Label text="가격" />
        <Input
          style={{ width: "100%" }}
          placeholder="가격을 제시해주세요"
          value={getCost(request_cost)}
          onChangeText={(text) => {
            if (text.startsWith("0") && text.length > 1) {
              text = text.replace(/^0+/, "");
            }
            const cost = text.replace(/[^0-9]/g, "");
            setCost(cost);
          }}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Label text="내용" />
        <TextField
          style={{ width: "100%", height: 140 }}
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",

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
