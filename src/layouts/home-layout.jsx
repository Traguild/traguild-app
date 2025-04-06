import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  Touchable,
  TouchableOpacity,
  Easing,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";

import SearchFilterModal from "components/01-home/SearchFilterModal";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { layout } from "resources/theme/layout";
import { FontAwesome6 } from "@expo/vector-icons";

const Layout = ({ children }) => {
  const HEIGHT = layout().height;

  const scale = useRef(new Animated.Value(0)).current;
  const [filter, setFilter] = useState("모두");
  const [visible, setVisible] = useState(false);

  const resizebox = (to) => {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.header,
          height: HEIGHT * (0.1 + (Platform.OS === "ios" ? 0.02 : 0)),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            top: Platform.OS === "ios" ? 15 : 10,
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <TouchableOpacity
            style={{ width: "24%" }}
            activeOpacity={1}
            onPress={() => {
              resizebox(1);
            }}
          >
            <TextInput
              style={styles.headerCategoryBox}
              value={filter}
              editable={false}
              onPress={() => {
                resizebox(1);
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.headerSearchBox}
            maxLength={18}
            placeholder="터치해서 검색"
          />
          <FontAwesome6
            name="magnifying-glass"
            size={14}
            color={theme["btn-floating"]}
            style={styles.headerMagnifier}
          />
        </View>
      </View>
      <View
        style={{
          ...styles.body,
          height: HEIGHT * (0.82 - (Platform.OS === "ios" ? 0.04 : 0)),
        }}
      >
        {children}
        <SearchFilterModal
          filterState={{ filter, setFilter }}
          visibleState={{ visible, setVisible }}
          resizebox={resizebox}
          scale={scale}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["home-bg"],
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme["default-bg"],
  },
  headerCategoryBox: {
    top: 8,
    backgroundColor: theme["input-field"],
    borderRadius: 20,
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "bold" : "500",
    padding: 12,
    color: theme["apply-text"],

    textAlign: "center",
  },
  headerMagnifier: {
    position: "absolute",
    right: 16,
    top: "50%",
    color: theme["apply-text"],
    weight: "bold",
  },
  headerSearchBox: {
    top: 8,
    width: "74%",
    backgroundColor: theme["input-field"],
    fontSize: 16,
    padding: 12,
    borderRadius: 20,
    color: theme["apply-text"],
    paddingRight: 40,
    paddingLeft: 16,
  },
  body: {},
});

export default Layout;
