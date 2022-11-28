import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import PlusButton from "../Components/PlusButton";
import TabBar from "../Components/TabBar";
import { HomeIcon, MenuIcon } from "../Icons/TabBarIcons";
import Employees from "../Screens/Employees";
import { userProfileSelector } from "../store/slices/profile";
import GroupNavigator from "./GroupNavigator";
import ProfileNavigator from "./ProfileNavigator";

const MainStack = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const isAuthenticated = useSelector(userProfileSelector);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        tabBar={props => {
          if (!isAuthenticated) {
            return null;
          }
          return <TabBar {...props} />;
        }}
        initialRouteName="ProfileStack"
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen
          name="Employees"
          component={Employees}
          options={{ tabBarIcon: <HomeIcon /> }}
        />
        <MainStack.Screen
          name="GroupStack"
          component={GroupNavigator}
          options={{
            tabBarIcon: <PlusButton />,
            tabBarLabel: "",
            tabBarIconStyle: { bottom: 15 },
          }}
        />
        <MainStack.Screen
          name="ProfileStack"
          component={ProfileNavigator}
          options={{ tabBarIcon: <MenuIcon />, tabBarLabel: "Profile" }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
