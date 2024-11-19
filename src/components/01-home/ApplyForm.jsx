import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const ApplyForm = ({ onFocus }) => {
  const applyTitle = useMemo(() => ["이름", "지역", "이메일", "소개"], []);
  const applyContent = {
    user_name: "홍길동",
    user_location: "경상남도 창원시 성산구",
    user_email: "gdhong1119@gmail.com",
  };
  const [applyIntro, setApplyIntro] = useState("");
  const onChangeText = (text) => setApplyIntro(text);

  return (
    <View style={styles.modalContent}>
      <View style={styles.menuColumn}>
        {applyTitle.map((title, idx) => (
          <View style={styles.menuName} key={idx}>
            <Text style={styles.applyMenu}>{title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.inputColumn}>
        <View style={styles.applyInput}>
          <Text style={styles.inputText}>{applyContent.user_name}</Text>
        </View>
        <View style={styles.applyInput}>
          <Text style={styles.inputText}>{applyContent.user_location}</Text>
        </View>
        <View style={styles.applyInput}>
          <Text style={styles.inputText}>{applyContent.user_email}</Text>
        </View>
        <View style={styles.applyInput}>
          <TextInput
            style={{ height: 150 }}
            textAlignVertical="top"
            multiline
            maxLength={200}
            onChangeText={onChangeText}
            value={applyIntro}
            onFocus={onFocus}
          />
        </View>
      </View>
    </View>
  );
};

export default ApplyForm;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  menuName: {
    marginTop: 15,
    padding: 10,
  },
  menuColumn: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  applyMenu: {
    color: theme["apply-text"],
    fontSize: 18,
    fontWeight: "600",
  },
  inputColumn: { flexDirection: "column", flex: 3, marginLeft: 30 },
  applyInput: {
    width: "100%",
    backgroundColor: theme["apply-input"],
    marginTop: 15,
    padding: 10,
    // borderWidth: 2,
    borderRadius: 15,
    borderColor: theme["default-btn"],
  },
  inputText: {
    color: theme["apply-text"],
    marginHorizontal: 5,
    fontSize: 14,
  },
});
