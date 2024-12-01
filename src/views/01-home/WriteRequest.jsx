import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { API } from "config/fetch.config";

// IMPORT COMPONENTS
import WriteForm from "components/01-home/WriteForm";

const WriteRequest = ({ navigation }) => {
  const toast = useToast();

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

  const handlePostRequest = async (formData) => {
    const user_idx = await AsyncStorage.getItem("user_idx");

    const res = await API.POST({
      url: "/userInfo/",
      data: { user_idx },
    });

    const { user_region } = res;

    formData.append("user_idx", user_idx);
    formData.append("request_region", user_region);

    await API.PUT({
      type: "multipart",
      url: "/requestInfo",
      data: formData,
    });

    toast.show("작성되었습니다.");
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <WriteForm onSubmit={handlePostRequest} />
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme["default-bg"],
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
});

export default WriteRequest;
