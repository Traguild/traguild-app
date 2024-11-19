import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

// IMPORT RESOURCES;
import { theme } from "resources/theme/common";
import { Feather } from "@expo/vector-icons";

const ApplyRequest = ({ modalVisible, setModalVisible }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["30%", "65%", "85%"], []);

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  useLayoutEffect(() => {
    if (modalVisible) handleOpen();
    else handleClose();
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
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTop}>
            <TouchableOpacity onPress={() => handleClose()}>
              <Feather name="x" size={24} color={theme["default-btn"]} />
            </TouchableOpacity>
            <Text style={styles.applyTitle}>지원하기</Text>
          </View>
        </View>
      </View>
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
  },
  modalTop: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: theme["default-border"],
  },
  applyTitle: {
    color: theme["apply-title"],
    fontSize: 24,
    fontWeight: "500",
  },
});
