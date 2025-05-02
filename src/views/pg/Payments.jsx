import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";

import { theme } from "resources/theme/common";

export default function PaymentScreen({ navigation, route }) {
  const [htmlUri, setHtmlUri] = useState(null);

  useEffect(() => {
    (async () => {
      const asset = Asset.fromModule(
        require("resources/html/tossPayment.html")
      );
      await asset.downloadAsync();
      setHtmlUri(asset.localUri);
    })();
  }, []);

  if (!htmlUri) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: htmlUri }}
        javaScriptEnabled
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        onMessage={({ nativeEvent }) => {
          const msg = JSON.parse(nativeEvent.data);
          if (msg.type === "success") {
            Alert.alert("결제 승인", `결제 성공: ${msg.data.paymentKey}`);
          } else {
            Alert.alert("결제 실패", `오류: ${msg.error.message}`);
          }
        }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
