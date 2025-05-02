import React from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";

export default function PaymentScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: "https://pay-traguild.vercel.app/" }}
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
  container: { flex: 1, width: "100%" },
});
