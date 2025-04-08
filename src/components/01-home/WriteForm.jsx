import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
// import * as ImagePicker from "expo-image-picker";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { getCost } from "resources/js/common";
import { layout } from "resources/theme/layout";
import { Feather } from "@expo/vector-icons";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";
import TextField from "components/common/TextField";
import ImagePicker from "components/common/ImagePicker";
import SelectCategory from "components/01-home/SelectCategory";

const WriteForm = ({ states }) => {
  const [visible, setVisible] = useState(false);
  const [reqeust_img, setImage] = states[0];
  const [request_title, setTitle] = states[1];
  const [request_category, setCategory] = states[2];
  const [request_content, setContent] = states[3];
  const [request_cost, setCost] = states[4];

  const handleImagePicker = async (resizedImage) => {
    setImage(resizedImage);
  };

  return (
    <View style={styles.container}>
      <SelectCategory
        categoryState={states[2]}
        visibleState={[visible, setVisible]}
      />
      <ImagePicker
        style={{ width: layout().width, height: layout().width }}
        onOk={handleImagePicker}
      >
        <View style={styles.itemImg}>
          <Feather
            name="image"
            size={layout().width * 0.1}
            color="rgba(250, 250, 250, 0.5)"
          />
        </View>
      </ImagePicker>
      <View style={styles.inputContainer}>
        <Label text="제목" />
        <Input
          style={{ width: "100%" }}
          placeholder="제목을 입력해주세요"
          value={request_title}
          onChangeText={(text) => setTitle(text)}
          maxLength={20}
        />
      </View>
      <View style={styles.inputContainer}>
        <Label text="분류" />
        <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)}>
          <Input
            style={{ width: "100%" }}
            placeholder="선택"
            value={request_category}
            onChangeText={(text) => setCategory(text)}
            maxLength={20}
            editable={false}
            onPress={() => setVisible(true)}
          />
        </TouchableOpacity>
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
      {/* <View style={styles.inputContainer}>
        <Button
          style={{ marginTop: 15, marginBottom: 15 }}
          text="작성하기"
          onPress={handleSubmit}
        />
      </View> */}
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
    position: "absolute",
    top: 0,

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
