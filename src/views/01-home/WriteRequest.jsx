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

  const handlePostRequest = async ({
    request_title,
    request_content,
    request_cost,
  }) => {
    const user_idx = await AsyncStorage.getItem("user_idx");
    await API.PUT({
      url: "/requestInfo",
      data: {
        user_idx,
        request_title,
        request_content,
        request_cost,
      },
    });
    toast.show("작성되었습니다.");
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <WriteForm onSubmit={handlePostRequest} />
        </ScrollView>
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
