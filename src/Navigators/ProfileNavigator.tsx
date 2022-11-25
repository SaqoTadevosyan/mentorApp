import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditProfile from "../Screens/EditProfile";
import Profile from "../Screens/Profile";

const ProfileStack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
}
