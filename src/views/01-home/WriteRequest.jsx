import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { use, useLayoutEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { API } from "config/fetch.config";
import { layout } from "resources/theme/layout";
import { useLocation } from "src/hooks/useLocation";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import WriteForm from "components/01-home/WriteForm";

const WriteRequest = ({ navigation }) => {
  const toast = useToast();
  const location = useLocation();

  const [reqeust_img, setImage] = useState(null);
  const [request_title, setTitle] = useState("");
  const [request_category, setCategory] = useState("");
  const [request_content, setContent] = useState("");
  const [request_cost, setCost] = useState("");

  const stateList = [
    [reqeust_img, setImage],
    [request_title, setTitle],
    [request_category, setCategory],
    [request_content, setContent],
    [request_cost, setCost],
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: null,
      headerStyle: { backgroundColor: "transparent" },
      headerTransparent: true,
      headerTintColor: theme["light-btn"],
    });
  }, [navigation]);

  const handleSubmit = () => {
    if (
      !request_title ||
      !request_content ||
      !request_cost ||
      !request_category
    ) {
      toast.show("모든 필드를 입력해주세요.", { type: "warning" });
      return;
    }

    const formData = new FormData();
    if (reqeust_img) {
      formData.append("image", {
        uri: reqeust_img.uri,
        type: reqeust_img.type,
        name: reqeust_img.fileName,
      });
    }
    formData.append("request_title", request_title);
    formData.append("request_content", request_content);
    formData.append("request_cost", request_cost);
    formData.append("request_category", request_category);

    handlePostRequest(formData);
  };

  const handlePostRequest = async (formData) => {
    const user_idx = await AsyncStorage.getItem("user_idx");

    formData.append("user_idx", user_idx);
    formData.append("request_region", location.city || "알 수 없음");
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);

    const result = await API.PUT({
      type: "multipart",
      url: "/requestInfo",
      data: formData,
    });

    if (result.status === "OK") {
      const creditRes = await API.POST({
        url: "/userInfo/",
        data: { user_idx },
      });

      const remainingCredit = creditRes?.user_credit ?? "알 수 없음";

      toast.show(`작성되었습니다. 남은 코인: ${remainingCredit}`, {
        type: "success",
      });

      navigation.goBack();
    } else if (result.status === "FAIL") {
      toast.show(result.msg || "소지한 코인이 부족합니다.", { type: "danger" });
    } else {
      toast.show("알 수 없는 오류가 발생했습니다.", { type: "danger" });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: layout().height * 0.9,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <WriteForm states={stateList} />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
      <View style={[styles.inputContainer]}>
        <Button style={{}} text="작성하기" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme["default-bg"],
  },

  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default WriteRequest;
