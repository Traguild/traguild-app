import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";
import { theme } from "resources/theme/common";

const RequestMarker = ({ latitude, longitude }) => {
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
    >
      <View style={styles.markerWrapper}>
        <Image source={defaultImg.logo} style={styles.markerImage} />
      </View>
    </Marker>
  );
};

export default RequestMarker;

const styles = StyleSheet.create({
  markerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderColor: theme["default-btn"],
    borderWidth: 3,
    borderRadius: 25,
  },
  markerImage: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    resizeMode: "contain",
    borderRadius: 25,
  },
});
