import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

//IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

import RequestMarker from "components/05-maps/RequestMarker";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

const Maps = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "내 주변 의뢰 찾기",
      headerTintColor: theme["default-btn"],
      headerStyle: {
        backgroundColor: theme["default-bg"],
        elevation: 0,
        shadowOpacity: 0,
      },
    });
    fetchLocation();
  }, [navigation]);

  const fetchLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const pos = await Location.getLastKnownPositionAsync();
      if (!pos) return;

      const { latitude, longitude } = pos.coords;
      setLocation({ latitude, longitude });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
        >
          <RequestMarker
            latitude={location.latitude}
            longitude={location.longitude}
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" style={styles.map} />
      )}
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1,
  },
});
