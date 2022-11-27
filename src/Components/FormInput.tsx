import React from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";

import {
  Control,
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl,
  Controller,
} from "react-hook-form";

interface Props {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  placeholder?: string;
}

export default function FormInput({
  control,
  name,
  errorMessage,
  label,
  placeholder,
}: Props) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <TextInput
              style={styles.input}
              {...field}
              onChangeText={field.onChange}
              placeholder={placeholder}
            />
          );
        }}
      />

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 6,
    height: 42,
    marginVertical: 5,
    paddingLeft: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  errorMessage: {
    color: "#FF3743",
    fontFamily: "Avenir-Medium",
    fontSize: 12,
    paddingLeft: 5,
  },
  label: {
    fontFamily: "Avenir-Medium",
  },
});
