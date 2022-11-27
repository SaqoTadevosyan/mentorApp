import React, { useEffect, useRef } from "react";

import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFormContext } from "react-hook-form";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useDispatch, useSelector } from "react-redux";

import { AddMemberIcon } from "../../Icons/ProfileIcons";
import {
  addSelectedEmployer,
  employeesSelector,
  removeSelectedEmployer,
  selectedEmployeesSelector,
  setSelectedEmployees,
} from "../../store/slices/groups";
import { IEmployer } from "../../types/IGroup";
import EmployerCard from "../EmployerCard";
import FormInput from "../FormInput";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function GroupForm() {
  const { control, setValue, trigger } = useFormContext();
  const modalizeRef = useRef<Modalize>(null);
  const employeesList: IEmployer[] = useSelector(employeesSelector);
  const selectedEmployees: IEmployer[] = useSelector(selectedEmployeesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue("employees", selectedEmployees);
    trigger();
  }, [selectedEmployees]);

  const selectUser = (employer: IEmployer) => {
    if (selectedEmployees.length < 5) {
      dispatch(addSelectedEmployer(employer));
    } else {
      Alert.alert("You can add maximum 5 employers");
    }
  };

  const renderItem = ({ item, drag }: RenderItemParams<IEmployer>) => {
    return (
      <ScaleDecorator>
        <EmployerCard
          employer={item}
          onSelect={() => dispatch(addSelectedEmployer(item))}
          onUnSelect={email => dispatch(removeSelectedEmployer(email))}
          selected={
            !!selectedEmployees.find(
              selectedEmployer => selectedEmployer.email === item.email,
            )
          }
          drag={drag}
        />
      </ScaleDecorator>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FormInput
        label="Group Name"
        control={control}
        name="groupName"
        placeholder={"Enter a group name"}
      />
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          modalizeRef.current?.open();
        }}
        style={styles.addBtn}
      >
        <Text style={styles.addBtnText}>{AddMemberIcon} Add a Member</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        <DraggableFlatList
          keyExtractor={item => item.email}
          data={selectedEmployees}
          onDragEnd={({ data }) => dispatch(setSelectedEmployees(data))}
          renderItem={renderItem}
          style={{ padding: 10 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalStyle={{ marginTop: 200, padding: 10, zIndex: 999999999 }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
            contentContainerStyle: {
              paddingHorizontal: 5,
              paddingBottom: 260,
            },
          }}
        >
          {employeesList.map(employer => (
            <EmployerCard
              employer={employer}
              onSelect={() => selectUser(employer)}
              onUnSelect={email => dispatch(removeSelectedEmployer(email))}
              key={employer.email}
              selected={
                !!selectedEmployees.find(
                  selectedEmployer => selectedEmployer.email === employer.email,
                )
              }
            />
          ))}
        </Modalize>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Avenir-Heavy",
    color: "#0D253C",
    fontSize: 24,
    marginBottom: 10,
  },
  createBtn: {
    height: 60,
    width: 295,
    borderRadius: 12,
    backgroundColor: "#376AED",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    alignSelf: "center",
  },
  createBtnText: {
    fontFamily: "Avenir-Heavy",
    color: "white",
  },
  addBtn: {
    alignItems: "center",
    marginTop: 10,
  },
  addBtnText: {
    fontFamily: "Avenir-Heavy",
    color: "#376AED",
  },
  disabledButton: {
    backgroundColor: "#a185ff",
  },
});
