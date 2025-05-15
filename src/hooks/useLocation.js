// hooks/useLocation.js
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) return;

        const pos = await Location.getLastKnownPositionAsync();
        if (!pos) return;

        const { latitude, longitude } = pos.coords;
        const location = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        const city = `${location[0]?.region ?? ""} ${location[0]?.city ?? ""} ${location[0]?.district ?? ""}`;
        setLocation({ latitude, longitude, city });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return location;
};
