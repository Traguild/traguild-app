import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { theme } from "resources/theme/common";

const BottomSheet = ({ children, resize = ["10%"], ...props }) => {
  const { isUpdate, setIsUpdate } = props;

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => resize, []);

  useEffect(() => {
    handleOpen();
    if (isUpdate) {
      setIsUpdate(false);
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [isUpdate]);

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleInputOutFocus = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      appearsOnIndex={0}
      disappearsOnIndex={0}
      enablePanDownToClose={false}
    >
      <TouchableWithoutFeedback onPress={handleInputOutFocus}>
        {children}
      </TouchableWithoutFeedback>
    </BottomSheetModal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});
