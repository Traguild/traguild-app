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
    width: "85%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
