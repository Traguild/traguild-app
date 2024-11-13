import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

// Import Views
import SignIn from "../../views/auth/SignIn";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="signIn">
      <Stack.Screen name="signIn" component={ SignIn } />
    </Stack.Navigator>
  );
} 

export default AppNavigator;
