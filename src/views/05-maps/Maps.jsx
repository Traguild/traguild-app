import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
import { useFocusEffect } from "@react-navigation/native";

const Maps = ({ navigation }) => {
  const location = useLocation();

  const [isUpdate, setIsUpdate] = useState(true);
  const [request, setRequest] = useState([]);
  const [requestData, setRequestData] = useState([]);

  const getRequestNearBy = async (location) => {
    const { latitude, longitude } = location;
    const res = await API.GET({
      url: "/requestInfo/nearby",
      data: { latitude, longitude },
    });
    setRequestData(
      res.filter((item) => {
        return item.is_deleted === 0;
      })
    );
    setIsUpdate(true);
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
    setRequest(
      res.filter((item) => {
        return item.request_state === "모집" && item.is_deleted === false;
      })
    );
  };

  useFocusEffect(
    useCallback(() => {
      getRequestLocation();
      if (location?.latitude && location?.longitude) {
        getRequestNearBy(location);
      }
    }, [location])
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {location?.latitude && location?.longitude ? (
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
            <BottomSheet
              resize={["10%", "50%"]}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            >
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
