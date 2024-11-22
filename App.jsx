import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/layouts/navigator/AppNavigator";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  return (
    <ToastProvider
      offsetTop={50}
      duration={3000}
      successColor="#a7c957"
      dangerColor="#f05650"
    >
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
}
