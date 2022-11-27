import React from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useSelector } from "react-redux";

import { employeesSelector } from "../store/slices/groups";
import { IEmployer } from "../types/IGroup";
import EmployerCard from "./EmployerCard";

export default function EmployeesList() {
  const employeesList: IEmployer[] = useSelector(employeesSelector);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {employeesList?.length > 0 ? (
        <View>
          {employeesList.map(employer => (
            <EmployerCard
              employer={employer}
              showSelectButton={false}
              key={employer.email}
            />
          ))}
        </View>
      ) : (
        <Text>No result</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingBottom: 60,
  },
});
