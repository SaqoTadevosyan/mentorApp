import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateGroup from "../Screens/CreateGroup";
import EditGroup from "../Screens/EditGroup";

const GroupStack = createNativeStackNavigator();

export default function GroupNavigator() {
  return (
    <GroupStack.Navigator
      initialRouteName="CreateGroup"
      screenOptions={{
        headerShown: false,
      }}
    >
      <GroupStack.Screen name="CreateGroup" component={CreateGroup} />
      <GroupStack.Screen name="EditGroup" component={EditGroup} />
    </GroupStack.Navigator>
  );
}
