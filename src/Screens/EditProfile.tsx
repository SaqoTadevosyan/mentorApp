import React from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useForm, useWatch } from "react-hook-form";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../Components/FormInput";
import { LeftIcon, UploadPictureIcon } from "../Icons/ProfileIcons";
import MainLayout from "../Layouts/MainLayout";
import { setUserInfo, userProfileSelector } from "../store/slices/profile";
import { IUser } from "../types/IProfile";
import { profileSchema } from "../validation/profileSchema";

export default function EditProfile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userProfile: IUser = useSelector(userProfileSelector);

  const { control, formState, getValues, reset, setValue } = useForm({
    mode: "all",
    resolver: yupResolver(profileSchema),
    defaultValues: { ...userProfile },
  });
  const profilePicture = useWatch({
    control,
    name: "profilePicture",
  });
  const submitForm = () => {
    const data = getValues();
    dispatch(setUserInfo(data));
    reset({ ...data });
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
    });
    if (result?.assets?.[0].uri) {
      setValue("profilePicture", result?.assets?.[0].uri, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <MainLayout>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <LeftIcon />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Edit Profile</Text>
        <View style={{ width: 20 }} />
      </View>
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.profileInfo}>
            <View>
              <Image
                source={{
                  uri:
                    profilePicture ||
                    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.uploadPicture}
                onPress={pickImage}
              >
                {UploadPictureIcon}
              </TouchableOpacity>
            </View>
          </View>
          <FormInput
            name={"firstName"}
            label={"First Name"}
            control={control}
            errorMessage={formState.errors.name?.message}
          />
          <FormInput
            name={"lastName"}
            label={"Last Name"}
            control={control}
            errorMessage={formState.errors.userName?.message}
          />
          <FormInput
            name={"city"}
            label={"Location"}
            control={control}
            errorMessage={formState.errors.position?.message}
          />

          <FormInput
            name={"department"}
            label={"Department"}
            control={control}
            errorMessage={formState.errors.name?.message}
          />
          <FormInput
            name={"jobTitle"}
            label={"Job Title"}
            control={control}
            errorMessage={formState.errors.userName?.message}
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!formState.isDirty || !formState.isValid) &&
                styles.disabledButton,
            ]}
            onPress={submitForm}
            disabled={!formState.isDirty || !formState.isValid}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MainLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontFamily: "Avenir-Heavy",
    color: "#0D253C",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    height: 42,
    marginVertical: 5,
    paddingLeft: 10,
  },
  profileImage: {
    height: 90,
    width: 84,
    borderRadius: 22,
    marginBottom: 10,
  },
  userName: {
    color: "#2D4379",
    fontFamily: "Avenir-Medium",
    textAlign: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "Avenir-Heavy",
    textAlign: "center",
  },
  position: {
    color: "#376AED",
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    textAlign: "center",
  },
  profileInfo: {
    alignItems: "center",
    marginVertical: 10,
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
  uploadPicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#376AED",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: -20,
  },
});
