import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, CommonActions } from "@react-navigation/native";

// Import Views
import Main from "views/Main";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";
import RequestDetail from "views/01-home/RequestDetail";
import WriteRequest from "views/01-home/WriteRequest";
import Favorite from "views/04-myPage/Favorite";
import QuestList from "views/04-myPage/QuestList";
import ProfileEdit from "views/04-myPage/ProfileEdit";

// IMPORT COMPONENTS
import AppTabNavigator from "./AppTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();

  const isLogin = async () => {
    const user_idx = await AsyncStorage.getItem("user_idx");
    return user_idx ? true : false;
  };

  global.navGo = {
    to: (screen, params) => navigation.navigate(screen, params),
    back: () => navigation.goBack(),
    re: (screen) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: screen }],
        })
      );
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLogin() ? "AppTabNavigator" : "Main"}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />

      <Stack.Screen
        name="RequestDetail"
        component={RequestDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="WriteRequest"
        component={WriteRequest}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="QuestList"
        component={QuestList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
