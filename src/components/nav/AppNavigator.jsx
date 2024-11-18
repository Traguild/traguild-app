import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, CommonActions } from "@react-navigation/native";

// Import Views
import SignIn from "views/auth/SignIn";
import RequestDetail from "views/01-home/RequestDetail";
import Favorite from "views/04-myPage/Favorite"; // 찜한 의뢰 화면
import QuestList from "views/04-myPage/QuestList"; // 찜한 의뢰 화면
import ProfileEdit from "views/04-myPage/ProfileEdit"; // 찜한 의뢰 화면

// IMPORT COMPONENTS
import AppTabNavigator from "./AppTabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();

  global.navGo = {
    to: (screen, params) => navigation.navigate(screen, params),
    back: () => navigation.goBack(),
    re: (screen) => {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: screen }],
      }));
    }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />

      <Stack.Screen name="RequestDetail" component={RequestDetail} options={{ headerShown: true }} />

      <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: true }} />
      <Stack.Screen name="QuestList" component={QuestList} options={{ headerShown: true }} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
