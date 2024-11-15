import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, CommonActions } from "@react-navigation/native";

// Import Views
import SignIn from "../../views/auth/SignIn";
import Home from "../../views/01-home/Home";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();

  global.navGo = {
    to: (screen) => {
      navigation.navigate(screen, screen);
    },
    back: () => {
      navigation.goBack();
    },
    re: (screen) => {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: screen }],
      }));
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={ SignIn } />
      <Stack.Screen name="Home" component={ Home } />
    </Stack.Navigator>
  );
} 

export default AppNavigator;
