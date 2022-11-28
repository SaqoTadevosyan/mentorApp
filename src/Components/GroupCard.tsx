import React, { useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { DownArrowIcon, UpArrowIcon } from "../Icons/ProfileIcons";
import { setSelectedGroupId } from "../store/slices/groups";
import { IGroup } from "../types/IGroup";
import { RootStackParamList } from "../types/IRoute";

export default function GroupCard({ employees, groupName, id }: IGroup) {
  const [showAllInfo, setShowAllInfo] = useState(false);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleEditGroup = () => {
    dispatch(setSelectedGroupId(id));
    navigation.navigate("GroupStack", {
      screen: "EditGroup",
      initial: false,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => setShowAllInfo(!showAllInfo)}
      style={styles.container}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: "https://www.shareicon.net/data/512x512/2016/06/30/788858_group_512x512.png",
          }}
          style={styles.profilePic}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{groupName}</Text>
          <Text style={styles.count}>{employees?.length} Members</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          {showAllInfo ? DownArrowIcon : UpArrowIcon}
        </View>
      </View>
      {showAllInfo && (
        <View
          style={{
            marginTop: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            {employees.map(employer => {
              return (
                <Text style={styles.additionalText}>
                  {employer.firstName} {employer.lastName}
                </Text>
              );
            })}
          </View>
          <View>
            <TouchableOpacity
              style={[styles.editBtn]}
              onPress={handleEditGroup}
            >
              <Text style={{ color: "white" }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    padding: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: 18,
    fontFamily: "Avenir-Heavy",
  },
  count: {
    color: "#376AED",
    fontSize: 12,
    fontFamily: "Avenir-Medium",
  },
  additionalText: {
    color: "#2D4379",
    fontFamily: "Avenir-Medium",
  },
  editBtn: {
    borderRadius: 8,
    backgroundColor: "#376AED",
    padding: 10,
    fontFamily: "Avenir-Heavy",
  },
  removeBtn: {
    backgroundColor: "#FF3572",
  },
});
