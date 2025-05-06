import {
  Keyboard,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import * as Location from "expo-location";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import Button from "components/common/Button";
import Label from "components/common/Label";
import Input from "components/common/Input";
import ImagePicker from "components/common/ImagePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserInfo = ({ setStep, user_idx }) => {
  const toast = useToast();
  const [image, setImage] = useState(null);
  const [user_region, setUserRegion] = useState("");
  const [user_nickname, setUserNickname] = useState("");
  const [ok, setOk] = useState(true);

  useEffect(() => {
    fetchLocation();
  }, [user_idx]);

  const continueSignUp = async () => {
    try {
      const res = await API.POST({
        url: "/userInfo/update",
        data: {
          user_idx,
          user_region,
          user_nickname,
        },
      });

      if (res) {
        await AsyncStorage.setItem("user_idx", user_idx.toString());
        toast.show(`${user_nickname}님 환영합니다!`);
        navGo.re("AppTabNavigator");
      } else {
        toast.show("오류가 발생했습니다.");
      }
    } catch (error) {
      console.error(error);
      toast.show("오류가 발생했습니다.");
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("user_idx", user_idx);
    formData.append("image", {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    return await API.POST({
      type: "multipart",
      url: "/userInfo/updateUserImg",
      data: formData,
    });
  };

  const fetchLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setOk(false);
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const city = `${location[0]?.region ?? ""} ${location[0]?.city ?? ""} ${location[0]?.district ?? ""}`;
      setUserRegion(city);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ marginVertical: 10 }}>
          <ImagePicker
            style={styles.profilePic}
            source={image}
            onOk={uploadImage}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label style={{ alignSelf: "flex-start" }} text="닉네임 " />
          <Input
            style={{ width: "100%" }}
            value={user_nickname}
            onChangeText={(text) => setUserNickname(text)}
            maxLength={10}
          />
        </View>
        <View style={styles.inputContainer}>
          <Label style={{ alignSelf: "flex-start" }} text="지역" />
          <Input
            style={{ width: "100%" }}
            value={user_region}
            onChangeText={(text) => setUserRegion(text)}
            readonly={true}
          />
        </View>
        <Button
          style={{ marginTop: 15 }}
          text="계속하기"
          onPress={continueSignUp}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 64,
    alignSelf: "center",
    // iOS 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android 그림자
    elevation: 5,
  },
});

export default UserInfo;
