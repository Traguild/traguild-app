import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

//IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

import RequestMarker from "components/05-maps/RequestMarker";

const Maps = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchLocation();
  }, []);

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

export default defaultLayout(Maps);

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1,
  },
});
