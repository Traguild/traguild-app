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

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { Feather } from "@expo/vector-icons";

// IMPORT COMPONENTS
import ApplyForm from "components/01-home/ApplyForm";
import Button from "components/common/Button";

const ApplyRequest = ({ modalVisible, setModalVisible, info }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "80%", "100%"], []);

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleInputFocus = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(2);
  }, []);
  const handleInputOutFocus = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  useLayoutEffect(() => {
    if (modalVisible) handleOpen();
  }, [modalVisible]);

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
            <View style={styles.modalTop}>
              <TouchableOpacity onPress={() => handleClose()}>
                <Feather name="x" size={24} color={theme["default-btn"]} />
              </TouchableOpacity>
              <Text style={styles.applyTitle}>지원하기</Text>
            </View>
            <ApplyForm onFocus={handleInputFocus} info={info} />
            <View style={styles.modalBottom}>
              <Button text="제출하기" />
            </View>
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
    width: "100%",
    alignItems: "center",
  },
});
