import React, { useState } from "react";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  DownArrowIcon,
  EmailIcon,
  LocationIcon,
  PositionIcon,
  UpArrowIcon,
} from "../Icons/ProfileIcons";
import { GenderEnum, IEmployer } from "../types/IGroup";

interface IProps {
  employer: IEmployer;
  onSelect?: (email: string) => void;
  onUnSelect?: (email: string) => void;
  selected?: boolean;
  drag?: () => void;
  showSelectButton?: boolean;
}

export default function EmployerCard({
  employer,
  onSelect = () => {},
  onUnSelect = () => {},
  selected = false,
  drag = () => {},
  showSelectButton = true,
}: IProps) {
  const [showAllInfo, setShowAllInfo] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setShowAllInfo(!showAllInfo)}
      style={styles.container}
      onLongPress={drag}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri:
              employer.gender === GenderEnum.Male
                ? "https://st2.depositphotos.com/2703645/7303/v/600/depositphotos_73039841-stock-illustration-male-avatar-icon.jpg"
                : "https://media.istockphoto.com/id/1188460614/vector/portrait-of-a-young-beautiful-asian-fashion-woman-vector-flat-illustration-asian-cute-girl.jpg?s=170667a&w=0&k=20&c=CYVJsVeQyXsq8h1NmbVm6-3xuAn0rcs5MJZd-owzDpA=",
          }}
          style={styles.profilePic}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>
            {employer.firstName} {employer.lastName}
          </Text>
          <Text style={styles.position}>{employer.jobTitle}</Text>
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
            <Text style={styles.additionalText}>
              {EmailIcon} {employer.email}
            </Text>
            <Text style={styles.additionalText}>
              {LocationIcon} {employer.city}
            </Text>
            <Text style={styles.additionalText}>
              {PositionIcon} {employer.department}
            </Text>
          </View>
          {showSelectButton && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selected ? (
                <TouchableOpacity
                  onPress={() => onUnSelect(employer.email)}
                  style={[styles.addBtn, styles.removeBtn]}
                >
                  <Text style={{ color: "white" }}>Remove</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => onSelect(employer.email)}
                  style={[styles.addBtn]}
                >
                  <Text style={{ color: "white" }}>Add to group</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
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
  position: {
    color: "#376AED",
    fontSize: 12,
    fontFamily: "Avenir-Medium",
  },
  additionalText: {
    color: "#2D4379",
    fontFamily: "Avenir-Medium",
  },
  addBtn: {
    borderRadius: 8,
    backgroundColor: "#376AED",
    padding: 10,
    fontFamily: "Avenir-Heavy",
  },
  removeBtn: {
    backgroundColor: "#FF3572",
  },
});
