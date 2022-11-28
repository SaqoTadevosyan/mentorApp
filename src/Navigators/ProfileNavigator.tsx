import React, { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import CreateProfile from "../Screens/CreateProfile";
import EditGroup from "../Screens/EditGroup";
import EditProfile from "../Screens/EditProfile";
import Profile from "../Screens/Profile";
import { getGroups } from "../store/slices/groups";
import { getUser, userProfileSelector } from "../store/slices/profile";

const ProfileStack = createNativeStackNavigator();
export default function ProfileNavigator() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(userProfileSelector);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getGroups());
  }, []);

  return (
    <ProfileStack.Navigator
      initialRouteName={isAuthenticated ? "Profile" : "CreateProfile"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <ProfileStack.Screen name="Profile" component={Profile} />
          <ProfileStack.Screen name="EditProfile" component={EditProfile} />
        </>
      ) : (
        <ProfileStack.Screen name="CreateProfile" component={CreateProfile} />
      )}
    </ProfileStack.Navigator>
  );
}
