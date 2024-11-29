import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { icons } from "resources/theme/icons";
import { Entypo } from "react-native-vector-icons";

const getManner = (rate) => {
  if (rate >= 75) return "manner-best";
  if (rate >= 50) return "manner-default";
  if (rate >= 25) return "manner-normal";
  return "manner-bad";
};

const MyManner = ({ rate, descript = true, size = 20, ...props }) => {
  const [manner, setManner] = useState("manner-default");

  const mannerText = {
    "manner-best": "당신이 최고에요!",
    "manner-default": "잘 하고 있어요!",
    "manner-normal": "조금만 더 노력해요!",
    "manner-bad": "더 노력해야겠어요!",
  };

  useEffect(() => {
    setManner(getManner(rate));
  }, [rate]);

  return (
    <View style={{ flexDirection: "row" }}>
      <Entypo
        name={icons[manner]}
        size={size}
        color={theme[icons[manner]]}
        {...props}
      />
      {descript && (
        <Text style={{ ...styles.profileManner, color: theme[icons[manner]] }}>
          {mannerText[manner]}
        </Text>
      )}
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
