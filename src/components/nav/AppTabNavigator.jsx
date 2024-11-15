import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

// IMPORT RESOURCES
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../resources/theme/common";

// IMPORT VIEWS
import Home from "../../views/01-home/Home";
import Community from "../../views/02-community/Community";
import Chat from "../../views/03-chat/Chat";
import MyPage from "../../views/04-myPage/MyPage";

const HEIGHT = Dimensions.get("window").height;
const iconSize = 24;

const AppTabNavigator = () => {
  const icons = {
    Home: (focused, props) => {
      return (
        <Ionicons
          name={focused ? "home" : "home-outline"}
          size={iconSize}
          style={[props.style]}
        />
      );
    },
    Community: (focused, props) => {
      return (
        <Ionicons
          name={focused ? "newspaper" : "newspaper-outline"}
          size={iconSize}
          style={[props.style]}
        />
      );
    },
    Chat: (focused, props) => {
      return (
        <Ionicons
          name={focused ? "chatbubbles" : "chatbubbles-outline"}
          size={iconSize}
          style={[props.style]}
        />
      );
    },
    MyPage: (focused, props) => {
      return (
        <Ionicons
          name={focused ? "person" : "person-outline"}
          size={iconSize}
          style={[props.style]}
        />
      );
    },
  };
  const tabOptions = ({ route }) => ({
    tabBarStyle: {
      height: HEIGHT * 0.1,
      backgroundColor: theme["home-bg"],
    },
    tabBarActiveTintColor: theme["tab-active"],
    tabBarInactiveTintColor: theme["tab-inactive"],

    tabBarIcon: ({ focused }) => {
      return icons[route.name](focused, {
        style: { ...(focused ? styles.focusedIcon : styles.defaultIcon) },
      });
    },
  });

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={tabOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  focusedIcon: {
    color: theme["tab-active"],
    transform: [{ scale: 1.1 }],
  },
  defaultIcon: {
    color: theme["tab-inactive"],
  },
});

export default AppTabNavigator;