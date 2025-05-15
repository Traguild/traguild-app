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
        setLocation({ latitude, longitude });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return location;
};
