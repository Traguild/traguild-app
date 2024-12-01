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
  const [user_email, setEmail] = useState(userInfo?.user_email ?? "");
  const [user_pw, setPassword] = useState("");
  const [new_user_pw, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    else if (user_pw || new_user_pw || confirmPassword) {
      if (!user_pw) return toast.show("현재 비밀번호를 입력하세요");
      else if (!new_user_pw) return toast.show("새로운 비밀번호를 입력하세요");
      else if (!confirmPassword)
        return toast.show("새로운 비밀번호를 한번 더 입력하세요");
      else if (new_user_pw !== confirmPassword)
        return toast.show("새로운 비밀번호가 일치하지 않습니다");
    }

    const updatedData = {
      user_idx: userInfo?.user_idx,
      user_nickname,
      user_region,
      user_email,
    };

    if (user_pw && new_user_pw) {
      updatedData.user_pw = user_pw;
      updatedData.new_user_pw = new_user_pw;
    }

    try {
      const res = await API.POST({
        url: "/userInfo/update",
        data: updatedData,
      });

      if (res?.message) {
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
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
            <Label style={{ alignSelf: "flex-start" }} text="이름" />
            <Input
              style={{ width: "100%" }}
              value={userInfo?.user_name ?? "알 수 없음"}
              onChangeText={(text) => setName(text)}
              readonly
            />
          </View>
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="닉네임" />
            <Input
              style={{ width: "100%" }}
              value={user_nickname}
              onChangeText={(text) => setNickname(text)}
              placeholder="닉네임을 입력하세요"
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
          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="이메일" />
            <Input
              style={{ width: "100%" }}
              value={userInfo?.user_email ?? "알 수 없음"}
              onChangeText={(text) => setEmail(text)}
              placeholder="이메일을 입력하세요"
              keyboardType="email-address"
              readonly
            />
          </View>

          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="현재 비밀번호 " />
            <Input
              style={{ width: "100%" }}
              value={user_pw}
              onChangeText={(text) => setPassword(text)}
              placeholder="현재 비밀번호를 입력하세요"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Label
              style={{ alignSelf: "flex-start" }}
              text="새로운 비밀번호 "
            />
            <Input
              style={{ width: "100%" }}
              value={new_user_pw}
              onChangeText={(text) => setNewPassword(text)}
              placeholder="새 비밀번호를 입력하세요"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Label style={{ alignSelf: "flex-start" }} text="비밀번호 확인 " />
            <Input
              style={{ width: "100%" }}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder="비밀번호를 다시 입력하세요"
              secureTextEntry={true}
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
