import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { icons } from "resources/theme/icons";
import { Entypo } from "react-native-vector-icons";

const MyManner = () => {
  const [manner, setManner] = useState("manner-default");
  const mannerText = {
    "manner-best": "당신이 최고에요!",
    "manner-default": "잘 하고 있어요!",
    "manner-normal": "조금만 더 노력해요!",
    "manner-bad": "더 노력해야겠어요!",
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <Entypo name={icons[manner]} size={20} color={theme[icons[manner]]} />
      <Text style={{ ...styles.profileManner, color: theme[icons[manner]] }}>
        {mannerText[manner]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileManner: {
    marginLeft: 5,
    marginBottom: 12,

    fontSize: 16,
  },
});

export default MyManner;
