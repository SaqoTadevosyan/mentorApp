import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../types/IProfile";

type stateType = {
  userInfo: IUser;
};
const initialState: stateType = {
  userInfo: {
    firstName: "Jovi",
    lastName: "Daniel",
    city: "Yerevan",
    jobTitle: "UX Designer",
    department: "first",
    profilePicture:
      "https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&w=1000&q=80",
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = profileSlice.actions;

//Selectors
export const userProfileSelector = state => state.profile.userInfo;

export default profileSlice.reducer;
