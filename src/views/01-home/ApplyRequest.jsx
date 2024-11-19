import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

// IMPORT RESOURCES;
import { theme } from "resources/theme/common";
import { Entypo } from "@expo/vector-icons";

const ApplyRequest = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType={"slide"}
      visible={modalVisible}
      presentationStyle={"pageSheet"}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalTop}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Entypo name="cross" size={36} color={theme["default-btn"]} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ApplyRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
  },
  modalTop: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
});
