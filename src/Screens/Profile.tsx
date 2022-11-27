import React, { useState } from "react";

import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Popover from "react-native-popover-view";
import { useDispatch, useSelector } from "react-redux";

import GroupCard from "../Components/GroupCard";
import { MoreIcon, ShareIcon } from "../Icons/ProfileIcons";
import MainLayout from "../Layouts/MainLayout";
import { groupsSelector } from "../store/slices/groups";
import { logOut, userProfileSelector } from "../store/slices/profile";
import { IGroup } from "../types/IGroup";
import { IUser } from "../types/IProfile";

export default function Profile() {
  const navigation = useNavigation();
  const [showPopover, setShowPopover] = useState(false);
  const userProfile: IUser = useSelector(userProfileSelector);
  const groups: IGroup[] = useSelector(groupsSelector);
  const dispatch = useDispatch();
  const onShare = async () => {
    try {
      await Share.share({
        message: `Name: ${userProfile.firstName} ${userProfile.lastName} \nLocation: ${userProfile.city}\nDepartment:${userProfile.department}\nJob Title:${userProfile.jobTitle}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <MainLayout>
      <>
        <View style={[styles.header]}>
          <Text style={[styles.headerTitle]}>Profile</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={{
                marginRight: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={onShare}
            >
              {ShareIcon}
            </TouchableOpacity>
            <Popover
              isVisible={showPopover}
              onRequestClose={() => setShowPopover(false)}
              from={
                <TouchableOpacity
                  onPress={() => setShowPopover(true)}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MoreIcon />
                </TouchableOpacity>
              }
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flex: 2,
                  borderBottomWidth: 1,
                  borderBottomColor: "#F5F8FF",
                }}
                onPress={() => {
                  setShowPopover(false);
                  navigation.navigate("ProfileStack", {
                    screen: "EditProfile",
                  });
                }}
              >
                <Text numberOfLines={1}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingHorizontal: 20, paddingVertical: 10, flex: 2 }}
                onPress={() => {
                  dispatch(logOut());
                  navigation.navigate("ProfileStack", {
                    screen: "CreateProfile",
                  });
                }}
              >
                <Text>Log out</Text>
              </TouchableOpacity>
            </Popover>
          </View>
        </View>
        <View style={styles.container}>
          <View style={[styles.profileContainer]}>
            <View style={[styles.profileInfoContainer]}>
              <View style={[styles.profileInfoHeader]}>
                <Image
                  source={{
                    uri:
                      userProfile?.profilePicture ||
                      "https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png",
                  }}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={[styles.name]}>
                    {userProfile.firstName} {userProfile.lastName}
                  </Text>
                  <Text style={[styles.position]}>{userProfile.jobTitle}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.groupsContainer]}>
            <Text style={[styles.headerTitle]}>My Groups</Text>
            {groups.length > 0 ? (
              <FlatList
                data={groups}
                renderItem={group => {
                  return <GroupCard {...group.item} />;
                }}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 4 }}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text style={[styles.noResults]}>No Results</Text>
            )}
          </View>
        </View>
      </>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  profileInfoContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 16,
    padding: 32,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  profileContainer: {
    backgroundColor: "#F5F8FF",
    paddingBottom: 32,
    paddingHorizontal: 40,
  },
  headerTitle: {
    fontFamily: "Avenir-Heavy",
    color: "#0D253C",
    fontSize: 24,
  },
  profileImage: {
    height: 84,
    width: 84,
    borderRadius: 22,
    marginRight: 24,
  },
  profileInfoHeader: {
    flexDirection: "row",
  },
  userName: {
    color: "#2D4379",
    fontFamily: "Avenir-Medium",
  },
  name: {
    fontSize: 18,
    fontFamily: "Avenir-Heavy",
  },
  position: {
    color: "#376AED",
    fontSize: 16,
    fontFamily: "Avenir-Medium",
  },
  aboutMeContainer: {
    marginTop: 24,
  },
  aboutMeTitle: {
    color: "#0D253C",
    fontSize: 16,
    fontFamily: "Avenir-Heavy",
  },
  description: {
    color: "#2D4379",
    marginTop: 8,
    fontFamily: "Avenir-Medium",
  },
  groupsContainer: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 32,
    paddingHorizontal: 40,
    paddingVertical: 32,
    top: 40,
  },
  noResults: {
    textAlign: "center",
    color: "#2D4379",
    marginTop: 8,
    fontFamily: "Avenir-Medium",
  },
  actionsContainer: {
    flexDirection: "row",
  },
});
