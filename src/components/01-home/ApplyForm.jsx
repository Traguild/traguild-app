import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useMemo, useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import Label from "components/common/Label";
import Input from "components/common/Input";
import TextField from "components/common/TextField";

const ApplyForm = ({ onFocus }) => {
  const applyTitle = useMemo(() => ["이름", "지역", "이메일", "소개"], []);
  const applyContent = {
    user_name: "홍길동",
    user_location: "경상남도 창원시 성산구",
    user_email: "gdhong1119@gmail.com",
  };
  const [applyIntro, setApplyIntro] = useState("");

  return (
    <View style={styles.modalContent}>
      {/* <View style={styles.menuColumn}>
        {applyTitle.map((title, idx) => (
          <Label text={title} key={idx} />
        ))}
      </View> */}

      <View style={styles.inputColumn}>
        <View style={{ flexDirection: "row" }}>
          <Label style={{ width: "20%" }} text={"이름"} />
          <Input
            style={{ marginTop: 10, width: "80%" }}
            text={applyContent.user_name}
            readonly={true}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Label style={{ width: "20%" }} text={"지역"} />
          <Input
            style={{ marginTop: 10, width: "80%" }}
            text={applyContent.user_location}
            readonly={true}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Label style={{ width: "20%" }} text={"이메일"} />
          <Input
            style={{ marginTop: 10, width: "80%" }}
            text={applyContent.user_email}
            readonly={true}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Label style={{ width: "20%" }} text={"소개"} />
          <TextField
            style={{ marginTop: 10, width: "80%" }}
            value={applyIntro}
            onChangeText={setApplyIntro}
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
    height: 380,
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  menuColumn: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },

  inputColumn: { flexDirection: "column", flex: 1, marginLeft: 10 },
});
