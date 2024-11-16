import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "components/nav/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}