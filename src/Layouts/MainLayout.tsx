import React, { ReactElement } from "react";

import { SafeAreaView } from "react-native";

export default function MainLayout({ children }: { children: ReactElement }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F8FF" }}>
      {children}
    </SafeAreaView>
  );
}
