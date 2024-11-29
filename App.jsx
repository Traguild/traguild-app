import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/layouts/navigator/AppNavigator";
import { ToastProvider } from "react-native-toast-notifications";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <ToastProvider
      offsetBottom={100}
      duration={1500}
      style={styles.toastContainer}
    >
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    width: "85%", // 고정된 너비 설정
    backgroundColor: "rgba(0, 0, 0, 0.6)", // 배경색 설정
    borderRadius: 20, // 테두리 둥글게 설정
    alignItems: "center", // 텍스트 가운데 정렬
    justifyContent: "center", // 세로 방향 중앙 정렬
  },
});
