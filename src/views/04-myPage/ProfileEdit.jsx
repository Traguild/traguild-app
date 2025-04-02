import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";

const ProfileEdit = ({ navigation, route }) => {
  const { userInfo } = route.params;

  const toast = useToast();
  const [user_region, setRegion] = useState(userInfo?.user_region ?? "");
  const [user_nickname, setNickname] = useState(
    userInfo?.user_nickname ?? "알 수 없음"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "",
      headerStyle: {
        backgroundColor: theme["default-bg"],
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: theme["default-btn"],
    });
  });

  const handleSaveMyInfo = async () => {
    /* Validation */
    if (!user_nickname) return toast.show("닉네임을 입력하세요");
    else if (!user_region) return toast.show("지역을 입력하세요");

    const updatedData = {
      user_idx: userInfo?.user_idx,
      user_nickname,
      user_region,
    };

    try {
      const res = await API.POST({
        url: "/userInfo/update",
        data: updatedData,
      });

      if (res?.message) {
        return toast.show(res.message);
      } else if (res) {
        toast.show("저장되었습니다", { type: "success" });
        navigation.goBack();
      } else {
        toast.show(res.message || "저장 중 오류가 발생했습니다");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.show("저장 중 오류가 발생했습니다");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="닉네임" />
            <Input
              style={{ width: "100%" }}
              value={user_nickname}
              onChangeText={(text) => setNickname(text)}
              placeholder="닉네임을 입력하세요"
              maxLength={10}
            />
          </View>
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="지역 " />
            <Input
              style={{ width: "100%" }}
              value={user_region}
              onChangeText={(text) => setRegion(text)}
              placeholder="지역을 입력하세요"
            />
          </View>
          <Button
            style={{ marginTop: 15 }}
            text="저장하기"
            onPress={handleSaveMyInfo}
          />
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  postButton: {
    backgroundColor: theme["default-btn"],
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileEdit;
