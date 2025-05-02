import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { getCost } from "resources/js/common";
import { theme } from "resources/theme/common";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

// IMPORT COMPONENTS
import MyItem from "components/04-myPage/MyItem";
import MyManner from "components/04-myPage/MyManner";
import ApplyList from "components/04-myPage/ApplyList";
import Button from "components/common/Button";
import ImagePicker from "components/common/ImagePicker";
import { useFocusEffect } from "@react-navigation/native";

const MyPage = () => {
  // const toast = useToast();
  const USER_IDX = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        await getUserInfo();
      };
      getData();
    }, [getUserInfo])
  );

  const getUserInfo = async () => {
    USER_IDX.current = await AsyncStorage.getItem("user_idx");
    const user_idx = USER_IDX.current;

    const res = await API.POST({
      url: "/userInfo",
      data: { user_idx },
    });

    if (JSON.stringify(res) !== JSON.stringify(userInfo)) {
      setUserInfo(res);
    }

    const img_url = `https://traguild.kro.kr/api/userInfo/userImg/${user_idx}?timestamp=${new Date().getTime()}`;

    if (img_url != image && res.user_img != "") {
      setImage(img_url);
    }

    setIsLoading(false);
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    navGo.re("Main");
  };

  const chargeCredit = async () => {
    const user_idx = USER_IDX.current;
    const myCredit = userInfo?.user_credit ?? 0;

    const res = await API.POST({
      url: "/userInfo/updateforcredit",
      data: { user_idx, user_credit: myCredit + 300 },
    });

    if (res) getUserInfo();
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("user_idx", USER_IDX.current);
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
  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    bottomSheetRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      {isLoading ? (
        <View style={styles.loadingWrap}></View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navGo.to("UserProfile", {
                user_idx: USER_IDX.current,
                user_nickname: userInfo?.user_nickname,
              });
            }}
          >
            <View style={styles.profileBox}>
              <ImagePicker
                style={styles.profilePic}
                source={image}
                onOk={uploadImage}
              />
              <View style={styles.profileTop}>
                <Text style={styles.profileName}>
                  {userInfo?.user_nickname ?? "알 수 없음"}
                </Text>
                <MyManner rate={userInfo?.user_rate ?? 50} />
              </View>
              <TouchableOpacity
                style={styles.signOutBtn}
                activeOpacity={0.7}
                onPress={signOut}
              >
                <Text style={styles.signOutText}>로그아웃</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.myCreditBox}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="coins" size={22} color="#f7b801" />
              <Text style={styles.myCredit}>
                {getCost(userInfo?.user_credit ?? 0)} 코인
              </Text>
            </View>
            <Button
              type="light"
              textStyle={{ fontSize: 16 }}
              text="충전하기"
              // onPress={chargeCredit}
              onPress={() => {
                navGo.to("Payments");
              }}
            />
          </View>

          <View style={styles.requestBox}>
            {[
              { text: "찜한 의뢰", screen: "Favorite" },
              { text: "의뢰 내역", screen: "QuestList" },
              { text: "프로필 수정", screen: "ProfileEdit" },
            ].map((item, idx) => (
              <MyItem
                key={idx}
                text={item.text}
                onPress={() => {
                  navGo.to(item.screen, { userInfo });
                }}
              />
            ))}
          </View>

          <View style={styles.applyListContainer}>
            <Text style={styles.applyListTitle}>지원자 목록</Text>
            <View style={styles.applyList}>
              <ApplyList onSelectApplicant={handleOpenModal} />
            </View>
          </View>
        </View>
      )}
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            opacity={0.5}
            pressBehavior="close"
          />
        )}
        onDismiss={() => setSelectedApplicant(null)}
        backgroundStyle={styles.modalBackground}
      >
        {selectedApplicant && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>지원자 정보</Text>
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.dismiss()}
              >
                <Feather name="x" size={24} color={theme["default-btn"]} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalText}>
              <Text style={styles.boldText}>의뢰:</Text>{" "}
              {selectedApplicant.request_title}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navGo.to("UserProfile", {
                  user_idx: selectedApplicant.user_idx,
                  user_nickname: selectedApplicant.user_nickname,
                })
              }
            >
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>지원자:</Text>{" "}
                {selectedApplicant.user_nickname}
              </Text>
            </TouchableOpacity>
            <View style={{ height: 180 }}>
              <Text style={{ ...styles.modalText, height: 180 }}>
                <Text style={styles.boldText}>소개:</Text>{" "}
                {selectedApplicant.applicant_intro}
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.approveButton]}>
                <Text style={styles.buttonText}>승인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                <Text style={styles.rejectText}>반려</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",

    borderColor: "lightgray",
    borderTopWidth: 0.45,
    borderBottomWidth: 0.45,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 46,
  },
  profileTop: {
    marginLeft: 15,
    flexDirection: "column",
  },
  profileName: {
    marginBottom: 10,

    fontSize: 24,
    fontWeight: "600",
  },

  myCreditBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 30,
    width: "100%",

    borderColor: "lightgray",
    borderBottomWidth: 0.45,
  },

  myCredit: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "500",
  },
  modalBackground: {
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 5,
  },
  modalContainer: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: theme["apply-title"],
  },
  modalText: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "700",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  chargeButton: {
    marginLeft: "auto",
    backgroundColor: theme["default-btn"],
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  chargeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  signOutBtn: {
    marginLeft: "auto",
    backgroundColor: theme["light-btn"],
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 50,
  },
  signOutText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  requestBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",

    borderColor: "lightgray",
    borderBottomWidth: 0.45,
    justifyContent: "space-around",
  },
  applyListContainer: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  applyListTitle: {
    color: theme["apply-text"],
    fontSize: 18,
    fontWeight: "600",

    marginLeft: 5,
    marginTop: 15,
    marginBottom: 10,
    textAlign: "flex-start",
    width: "100%",
  },
  applyList: {
    flex: 1,
    borderWidth: 0.45,
    borderColor: "lightgray",
    borderRadius: 15,
  },
  approveButton: {
    backgroundColor: "#6a994e",
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: "#ff7f51",
  },
  rejectText: {
    color: "#ff7f51",
    fontWeight: "500",
    fontSize: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default defaultLayout(MyPage);
