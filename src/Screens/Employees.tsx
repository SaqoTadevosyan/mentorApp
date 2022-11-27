import React, { useEffect } from "react";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useDispatch } from "react-redux";

import EmployeesList from "../Components/EmployeesList";
import MainLayout from "../Layouts/MainLayout";
import { getEmployees } from "../services/groups";
import { setEmployees } from "../store/slices/groups";

export default function Employees() {
  const dispatch = useDispatch();

  useEffect(() => {
    const employees = getEmployees();
    dispatch(setEmployees(employees));
  }, []);

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
