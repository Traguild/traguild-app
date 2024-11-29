import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/layouts/navigator/AppNavigator";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  return (
    <ToastProvider offsetBottom={100} duration={3000}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
}
