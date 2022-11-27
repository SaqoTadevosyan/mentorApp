import React from "react";

import { StyleSheet, Text, View } from "react-native";

import EmployeesList from "../Components/EmployeesList";
import MainLayout from "../Layouts/MainLayout";

export default function Employees() {
  return (
    <MainLayout>
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.headerTitle]}>Employees</Text>
        <EmployeesList />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Avenir-Heavy",
    color: "#0D253C",
    fontSize: 24,
    marginBottom: 10,
  },
});
