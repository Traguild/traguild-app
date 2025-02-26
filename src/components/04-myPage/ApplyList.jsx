import React, { useCallback, useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

// IMPORT RESOURCES
import { theme } from "../../resources/theme/common";
import { getContents } from "../../resources/js/common";
import { useFocusEffect } from "@react-navigation/native";

const ApplyList = () => {
  const [applyList, setApplyList] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "80%"], []);

  useFocusEffect(
    useCallback(() => {
      const getApplyList = async () => {
        const user_idx = await AsyncStorage.getItem("user_idx");
        const res = await API.POST({
          url: "/requestApplicant/getApply",
          data: {
            user_idx,
            page: 1,
            limit: 10,
            status: "대기",
          },
        });

        setApplyList(res);
      };
      getApplyList();
    }, [])
  );

  const proceedApply = async ({ request_idx, user_idx, applicant_state }) => {
    const res = await API.POST({
      url: "/requestApplicant/update",
      data: { request_idx, user_idx, applicant_state },
    });

    if (res) {
      if (applicant_state === "승인") {
        await API.POST({
          url: "/requestApplicant/rejectAll",
          data: { request_idx },
        });
        await API.POST({
          url: "/requestInfo/update",
          data: {
            request_idx,
            request_state: "완료",
            applicant_idx: user_idx,
          },
        });
      }

      setApplyList((prev) =>
        prev.filter(
          (item) =>
            item.request_idx !== request_idx && item.user_idx !== user_idx
        )
      );

      bottomSheetRef.current?.dismiss();
    }
  };

  const handleOpenModal = (applicant) => {
    setSelectedApplicant(applicant);
    bottomSheetRef.current?.present();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.request_idx}
      style={styles.itemContainer}
      onPress={() => handleOpenModal(item)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.title}>의뢰: {item.request_title}</Text>
        <Text style={styles.subtitle}>{item?.user_nickname ?? "알 수 없음"}</Text>
        <Text style={styles.applyIntro}>{getContents(item.applicant_intro, 25)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BottomSheetModalProvider>
      <FlatList
        style={{ width: "100%" }}
        data={applyList}
        renderItem={renderItem}
        keyExtractor={(item) => item.request_idx.toString()}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.emptyText}>지원자가 없습니다.</Text>}
      />

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={(props) =>
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            opacity={0.5}
            pressBehavior="close"
          />}
        onDismiss={() => setSelectedApplicant(false)}
        backgroundStyle={{
          backgroundColor: theme["default-bg"],
          borderColor: "white",
          borderWidth: 5,
        }}
      >
        {selectedApplicant && (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedApplicant.request_title}</Text>
            <Text style={styles.modalText}>지원자: {selectedApplicant.user_nickname}</Text>
            <Text style={styles.modalText}>소개: {selectedApplicant.applicant_intro}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.approveButton]}
                onPress={() => proceedApply({ ...selectedApplicant, applicant_state: "승인" })}
              >
                <Text style={styles.buttonText}>승인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() => proceedApply({ ...selectedApplicant, applicant_state: "반려" })}
              >
                <Text style={{ ...styles.buttonText, color: "#ff7f51" }}>반려</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: theme["home-bg"],
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 0.45,
    borderColor: theme["default-border"],
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 15,
    marginTop: 5,
  },
  applyIntro: {
    color: "gray",
    fontSize: 12,
  },
  emptyText: {
    alignSelf: "center",
    color: "gray",
    marginTop: 20,
  },
  modalContainer: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  approveButton: {
    backgroundColor: "#6a994e",
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: "#ff7f51",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
});

export default ApplyList;
