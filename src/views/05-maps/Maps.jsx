import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import MapView from "react-native-maps";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// IMPORT HOOKS
import { useLocation } from "hooks/useLocation";

//IMPORT LAYOUTS
import defaultLayout from "layouts/hoc/defaultLayout";

import RequestMarker from "components/05-maps/RequestMarker";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";
import { API } from "config/fetch.config";
import BottomSheet from "components/common/BottomSheet";
import InfoSheet from "components/05-maps/InfoSheet";

const Maps = ({ navigation }) => {
  const location = useLocation();
  const [request, setRequest] = useState([]);
  const [requestData, setRequestData] = useState([]);

  const getRequestNearBy = async (location) => {
    const { latitude, longitude } = location;
    const res = await API.GET({
      url: "/requestInfo/nearby",
      data: { latitude, longitude },
    });
    setRequestData(res);
  };

  useEffect(() => {
    getRequestNearBy(location);
  }, [location]);

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
    getRequestLocation();
  }, [navigation]);

  const getRequestLocation = async () => {
    const res = await API.POST({ url: "/requestInfo/all" });
    setRequest(adjustOverlappingMarkers(res));
  };

  const adjustOverlappingMarkers = (markers) => {
    const seen = new Map();
    return markers.map((marker, idx) => {
      const key = `${marker.latitude.toFixed(5)}:${marker.longitude.toFixed(5)}`;
      const count = seen.get(key) || 0;
      seen.set(key, count + 1);
      const offset = 0.00005 * count;

      return {
        ...marker,
        latitude: marker.latitude + offset,
        longitude: marker.longitude + offset,
      };
    });
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {location ? (
          <>
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
              {request.map((item, index) => {
                return (
                  <RequestMarker
                    key={index}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    getRequestNearBy={getRequestNearBy}
                  />
                );
              })}
            </MapView>
            <BottomSheet resize={["10%", "50%"]}>
              <InfoSheet location={location} requestData={requestData} />
            </BottomSheet>
          </>
        ) : (
          <ActivityIndicator size="large" style={styles.map} />
        )}
      </View>
    </BottomSheetModalProvider>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1,
  },
});
