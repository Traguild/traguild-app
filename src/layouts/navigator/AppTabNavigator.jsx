import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

// IMPORT RESOURCES
import { Ionicons } from "@expo/vector-icons";
import { theme } from "resources/theme/common";
import { layout } from "resources/theme/layout";

// IMPORT VIEWS
import Home from "views/01-home/Home";
import Community from "views/02-community/Community";
import Chat from "views/03-chat/Chat";
import MyPage from "views/04-myPage/MyPage";

const ICON_SIZE = 24;

const AppTabNavigator = () => {
  const HEIGHT = layout().height;

  const getIcon = (tabName, focused, props) => (
    <Ionicons
      name={focused ? tabName : `${tabName}-outline`}
      size={ICON_SIZE}
      style={[props.style]}
    />
  );
  const icons = {
    Home: (focused, props) => getIcon("home", focused, props),
    Community: (focused, props) => getIcon("newspaper", focused, props),
    Chat: (focused, props) => getIcon("chatbubbles", focused, props),
    MyPage: (focused, props) => getIcon("person", focused, props),
  };
  const titles = {
    Home: "홈",
    Community: "커뮤니티",
    Chat: "채팅",
    MyPage: "내 정보",
  };

  const tabOptions = ({ route }) => ({
    tabBarStyle: {
      height: HEIGHT * (0.08 + (Platform.OS === "ios" ? 0.02 : 0)),
      backgroundColor: theme["home-bg"],
    },
    tabBarActiveTintColor: theme["tab-active"],
    tabBarInactiveTintColor: theme["tab-inactive"],

    tabBarIcon: ({ focused }) => {
      return icons[route.name](focused, {
        style: { ...(focused ? styles.focusedIcon : styles.defaultIcon) },
      });
    },
    tabBarLabel: ({ focused, color }) => {
      return (
        <Text
          style={{
            color,
            fontSize: 12,
            fontWeight: focused ? "bold" : "normal",
          }}
        >
          {titles[route.name]}
        </Text>
      );
    },
  });

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={tabOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        title="홈"
        options={{ headerShown: false, title: "홈" }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        title="홈"
        options={{ headerShown: false, title: "커뮤니티" }}
      />

      {/* <Tab.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false, title: "채팅" }}
      /> */}

      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false, title: "내 정보" }}
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
