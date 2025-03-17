import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import Views
import Main from "views/Main";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";
import RequestDetail from "views/01-home/RequestDetail";
import WriteRequest from "views/01-home/WriteRequest";
import Favorite from "views/04-myPage/Favorite";
import QuestList from "views/04-myPage/QuestList";
import ProfileEdit from "views/04-myPage/ProfileEdit";
import ChatDetail from "views/03-chat/ChatDetail";

// IMPORT RESOURCES
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import AppTabNavigator from "./AppTabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();
  const [isLogined, setIsLogined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user_idx = await AsyncStorage.getItem("user_idx");
      setIsLogined(!!user_idx);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

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

  if (!isLoading) {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLogined ? "AppTabNavigator" : "Main"}
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
          name="ChatDetail"
          component={ChatDetail}
          options={({ route }) => ({
            headerShown: true,
            title: `${route.params.chatData.user_nickname}님과의 대화`,
          })}
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
  } else {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigator;
