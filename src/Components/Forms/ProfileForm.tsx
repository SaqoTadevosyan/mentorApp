import React from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { useFormContext, useWatch } from "react-hook-form";
import { launchImageLibrary } from "react-native-image-picker";

import { UploadPictureIcon } from "../../Icons/ProfileIcons";
import FormInput from "../FormInput";

export default function ProfileForm() {
  const { control, formState, setValue } = useFormContext();

  const profilePicture = useWatch({
    control,
    name: "profilePicture",
  });

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
    <View>
      <View style={styles.profileInfo}>
        <View>
          <Image
            source={{
              uri:
                profilePicture ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png",
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.uploadPicture} onPress={pickImage}>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
