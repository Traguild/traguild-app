import {
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

/* IMPORT RESOURCES */
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import Input from "components/common/Input";
import Label from "components/common/Label";
import Button from "components/common/Button";

const PhoneAuth = ({ setStep, handleNext }) => {
  const toast = useToast();

  const [is_wait, setIsWait] = useState(false);
  const [user_id, setUserId] = useState("");
  const [auth_code, setAuthCode] = useState("");

  const handleChangeNumbers = (text) => {
    setUserId(
      text
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };

  const handleChangeCode = (text) => {
    setAuthCode(text.replace(/[^0-9]/g, ""));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (user_id.length < 13) {
      toast.show("휴대폰 번호를 입력해주세요.");
      return;
    } else {
      try {
        const res = await API.POST({
          url: "/auth",
          data: { user_id: user_id.replaceAll("-", "") },
        });

        setIsWait(true);
        toast.show("인증번호를 발송했습니다.");
      } catch (error) {}
    }
  };

  const handleAuth = async () => {
    if (auth_code.length < 4) {
      toast.show("인증번호를 입력해주세요.");
      return;
    } else {
      try {
        const res = await API.POST({
          url: "/auth/verify",
          data: { user_id: user_id.replaceAll("-", ""), code: auth_code },
        });

        if (!(res?.user_nickname ?? null)) {
          handleNext(res.user_idx);
        } else {
          await AsyncStorage.setItem("user_idx", res.user_idx.toString());
          toast.show(`${res.user_nickname}님 환영합니다!`);
          navGo.re("AppTabNavigator");
        }
      } catch (error) {
        console.error(error);

        toast.show("인증번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Label text="휴대폰 번호" style={{ alignSelf: "flex-start" }} />
          <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
            <Input
              style={{ width: "72%" }}
              value={user_id}
              onChangeText={handleChangeNumbers}
              keyboardType="numeric"
              maxLength={13}
            />
            <Button
              type="mini"
              style={{ width: "25%", marginLeft: "3%" }}
              textStyle={{ fontSize: 14 }}
              text={is_wait ? "재전송" : "인증요청"}
              onPress={handleSubmit}
            />
          </View>
        </View>
        {is_wait ? (
          <>
            <View style={styles.inputContainer}>
              <Label text="인증번호" style={{ alignSelf: "flex-start" }} />
              <Input
                style={{ width: "100%" }}
                value={auth_code}
                onChangeText={handleChangeCode}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
            <Button
              text="계속하기"
              style={{ marginTop: 20 }}
              onPress={handleAuth}
            />
          </>
        ) : (
          <Button
            text="계속하기"
            style={{ marginTop: 20 }}
            bgColor="gray"
            disabled
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    paddingHorizontal: 35,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});
