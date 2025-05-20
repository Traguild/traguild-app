import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useToast } from "react-native-toast-notifications";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { Feather } from "@expo/vector-icons";

// IMPORT COMPONENTS
import ApplyForm from "components/01-home/ApplyForm";
import Button from "components/common/Button";

const ApplyRequest = ({ modalVisible, setModalVisible, info }) => {
  const toast = useToast();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "75%"], []);

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleInputOutFocus = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  useLayoutEffect(() => {
    if (modalVisible) handleOpen();
  }, [modalVisible]);

  const setChildApplyIntro = (text) => {
    info.applicant_intro = text;
  };

  const handleApply = useCallback(async () => {
    const res = await API.PUT({
      url: "/requestApplicant",
      data: {
        request_idx: info.request_idx,
        user_idx: info.user_idx,
        applicant_intro: info.applicant_intro,
      },
    });

    if (res?.http_status === "fail") {
      toast.show("이미 지원한 의뢰입니다.");
      handleClose();
    } else {
      toast.show("지원이 완료되었습니다.");
      handleClose();
    }
  });

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          opacity={0.5} // 배경 투명도 설정
          pressBehavior="close" // 배경을 눌렀을 때 모달을 닫음
        />
      )}
      onDismiss={() => setModalVisible(false)}
      backgroundStyle={{
        backgroundColor: theme["default-bg"],
        borderColor: "white",
        borderWidth: 5,
      }}
    >
      <TouchableWithoutFeedback onPress={handleInputOutFocus}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <KeyboardAwareScrollView>
              <View style={styles.modalTop}>
                <TouchableOpacity onPress={() => handleClose()}>
                  <Feather name="x" size={24} color={theme["default-btn"]} />
                </TouchableOpacity>
                <Text style={styles.applyTitle}>지원하기</Text>
              </View>
              <ApplyForm info={info} setChildApplyIntro={setChildApplyIntro} />
              <View style={styles.modalBottom}>
                <Button text="제출하기" onPress={handleApply} />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BottomSheetModal>
  );
};

export default ApplyRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 5,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    paddingHorizontal: 15,
  },
  modalTop: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: theme["default-border"],
  },
  applyTitle: {
    color: theme["apply-title"],
    fontSize: 24,
    fontWeight: "500",
  },
  modalBottom: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
