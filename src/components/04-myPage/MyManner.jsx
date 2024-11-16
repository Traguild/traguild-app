import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { Entypo } from "react-native-vector-icons";

const MyManner = () => {
  const [manner, setManner] = useState("default");
  const mannerText = {
    "best": "당신이 최고에요!",
    "default": "잘 하고 있어요!",
    "normal": "조금만 더 노력해요!",
    "bad": "더 노력해야겠어요!",
  }
  const emoji = {
    "best": "emoji-flirt",
    "default": "emoji-happy",
    "normal": "emoji-neutral",
    "bad": "emoji-sad",
  }

  return (
    <View style={{ flexDirection: "row" }}>
      <Entypo name={ emoji[manner] } size={20} color={theme[emoji[manner]]} />
      <Text style={{ ...styles.profileManner, color: theme[emoji[manner]]}}>
        { mannerText[manner] }
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