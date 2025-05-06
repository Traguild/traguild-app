import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";

// IMPORT CONFIGS
import { API } from "config/fetch.config";

import { theme } from "resources/theme/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

export default function PaymentScreen({ navigation, route }) {
  const toast = useToast();

  const { credits, price } = route.params.item;

  const [injectedJS, setInjectedJS] = useState("");
  const [isLoading, setLoading] = useState(true);
  const USER_IDX = useRef(null);

  const initData = { orderName: `${credits}`, orderPrice: price };

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);

    const getUserInfo = async () => {
      USER_IDX.current = await AsyncStorage.getItem("user_idx");
    };

    setInjectedJS(`
      window.initialData = ${JSON.stringify(initData)};
      true;
    `);
    getUserInfo();
  }, []);

  const handleShouldStartLoadWithRequest = (request) => {
    const { url } = request;
    if (url.startsWith("intent://")) {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          const fallback = url.match(/S.browser_fallback_url=([^;]+)/)?.[1];
          if (fallback) Linking.openURL(decodeURIComponent(fallback));
        }
      });
      return false;
    }
    return true;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="36" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        style={{ marginTop: 50 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" />}
        originWhitelist={["*", "intent://*"]}
        source={{ uri: "https://pay-traguild.vercel.app" }}
        javaScriptEnabled
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        injectedJavaScript={injectedJS}
        onMessage={({ nativeEvent }) => {
          const msg = JSON.parse(nativeEvent.data);
          if (msg.type === "success") {
            API.POST({
              url: "/userInfo/update",
              data: {
                user_idx: USER_IDX.current,
                user_credit: credits,
              },
            });
            toast.show(`충전이 완료되었습니다. 코인: ${credits}`);
            navGo.back();
            navGo.back();
          } else {
            Alert.alert("결제 실패", `오류: ${msg.error.message}`);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
