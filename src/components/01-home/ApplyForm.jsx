import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useMemo, useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import Label from "components/common/Label";
import Input from "components/common/Input";
import TextField from "components/common/TextField";

const ApplyForm = ({ onFocus, info }) => {
  const [applyIntro, setApplyIntro] = useState("");

  return (
    <View style={styles.modalContent}>
      {/* <View style={styles.menuColumn}>
        {applyTitle.map((title, idx) => (
          <Label text={title} key={idx} />
        ))}
      </View> */}

      <View style={styles.inputColumn}>
        <View>
          <Label text={"닉네임"} />
          <Input
            style={{ width: "100%" }}
            value={info?.user_nickname ?? "알 수 없음"}
            readonly={true}
          />
        </View>
        <View>
          <Label text={"지역"} />
          <Input
            style={{ width: "100%" }}
            value={info?.user_region ?? ""}
            readonly={true}
          />
        </View>
        <View>
          <Label text={"이메일"} />
          <Input
            style={{ width: "100%" }}
            value={info?.user_email ?? ""}
            readonly={true}
          />
        </View>
        <View>
          <Label text={"소개"} />
          <TextField
            style={{ width: "100%" }}
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
    height: 500,
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
