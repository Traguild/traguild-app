import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useToast } from "react-native-toast-notifications";

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
      headerTintColor: theme["default-btn"],
    });
  }, [navigation]);

  const handlePostRequest = ({ request_title, request_content, request_cost }) => {
    API.PUT({
      url: "/requestInfo",
      data: {
        user_idx: 1,
        request_title,
        request_content,
        request_cost,
      },
    });
    toast.show("글이 작성되었습니다.", { type: "success" });
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