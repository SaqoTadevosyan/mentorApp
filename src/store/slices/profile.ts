import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../types/IProfile";

type stateType = {
  userInfo: IUser | null;
};
const initialState: stateType = {
  userInfo: null,
};

export const getUser = createAsyncThunk("user/get", async () => {
  const res = await AsyncStorage.getItem("user");
  return res;
});

export const saveUser = createAsyncThunk("user/create", async (user: IUser) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
  return user;
});

export const logOut = createAsyncThunk("user/logOut", async (user: IUser) => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("groups");
  return user;
});

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(saveUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userInfo = JSON.parse(action.payload || "");
    });
    builder.addCase(logOut.fulfilled, state => {
      state.userInfo = null;
    });
  },
});

export const { setUserInfo } = profileSlice.actions;

//Selectors
export const userProfileSelector = (state: any) => state.profile.userInfo;

export default profileSlice.reducer;
