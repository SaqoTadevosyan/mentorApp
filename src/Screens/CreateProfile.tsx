import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import ProfileForm from "../Components/Forms/ProfileForm";
import MainLayout from "../Layouts/MainLayout";
import { saveUser, userProfileSelector } from "../store/slices/profile";
import { IUser } from "../types/IProfile";
import { profileSchema } from "../validation/profileSchema";

export default function CreateProfile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userProfile: IUser = useSelector(userProfileSelector);

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(profileSchema),
    defaultValues: { ...userProfile },
  });

  const submitForm = () => {
    const data = methods.getValues();
    dispatch(saveUser(data));
    console.log("awdawd");

    navigation.navigate("ProfileStack", { screen: "Profile" });
  };

  return (
    <MainLayout>
      <>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Create Profile</Text>
        </View>
        <ScrollView style={styles.container}>
          <FormProvider {...methods}>
            <ProfileForm />
          </FormProvider>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!methods.formState.isDirty || !methods.formState.isValid) &&
                styles.disabledButton,
            ]}
            onPress={submitForm}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
          >
            <Text style={styles.buttonText}>Create Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    </MainLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontFamily: "Avenir-Heavy",
    color: "#0D253C",
  },

  submitButton: {
    height: 60,
    width: 295,
    borderRadius: 12,
    backgroundColor: "#376AED",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Avenir-Heavy",
    textTransform: "uppercase",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#a185ff",
  },
});
