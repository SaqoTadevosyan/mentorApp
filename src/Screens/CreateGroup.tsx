import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import uuid from "react-native-uuid";
import { useDispatch } from "react-redux";

import GroupForm from "../Components/Forms/GroupForm";
import MainLayout from "../Layouts/MainLayout";
import { createGroup } from "../store/slices/groups";
import { IGroup } from "../types/IGroup";
import { groupSchema } from "../validation/groupValidation";

export default function CreateGroup() {
  const methods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(groupSchema),
    defaultValues: {
      groupName: "",
      employees: [],
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: IGroup) => {
    dispatch(createGroup({ ...data, id: uuid.v4() }));
    methods.reset();
  };

  return (
    <MainLayout>
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingBottom: 20 }}
      >
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <Text style={[styles.headerTitle]}>Create a Group</Text>
          <FormProvider {...methods}>
            <GroupForm />
          </FormProvider>
        </View>
        <TouchableOpacity
          onPress={methods.handleSubmit(onSubmit)}
          style={[
            styles.createBtn,
            !methods.formState.isValid && styles.disabledButton,
          ]}
          disabled={!methods.formState.isValid}
        >
          <Text style={styles.createBtnText}>Create group</Text>
        </TouchableOpacity>
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
