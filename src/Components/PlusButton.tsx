import React from "react";

import { View } from "react-native";

import { PlusIcon } from "../Icons/TabBarIcons";

export default function PlusButton() {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 8,
        borderRadius: 30,
      }}
    >
      <PlusIcon />
    </View>
  );
}
