import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IEmployer, IGroup } from "../../types/IGroup";

type stateType = {
  employees: IEmployer[];
  groups: IGroup[];
  selectedEmployees: IEmployer[];
  selectedGroupId: string;
};
const initialState: stateType = {
  employees: [],
  groups: [],
  selectedEmployees: [],
  selectedGroupId: "",
};

export const getGroups = createAsyncThunk("group/get", async () => {
  const res = await AsyncStorage.getItem("groups");
  const groups = res ? JSON.parse(res) : [];
  return groups;
});

export const createGroup = createAsyncThunk("group/create", async group => {
  const res = await AsyncStorage.getItem("groups");
  const groups = res ? JSON.parse(res) : [];
  groups.push(group);
  await AsyncStorage.setItem("groups", JSON.stringify(groups));
  return groups;
});

export const updateGroup = createAsyncThunk(
  "group/update",
  async (group: IGroup) => {
    const groupsJSON = await AsyncStorage.getItem("groups");
    if (groupsJSON) {
      const groups = JSON.parse(groupsJSON);
      const index = groups.findIndex((item: IGroup) => item.id === group.id);
      if (index !== -1) {
        groups[index] = group;
      }
      await AsyncStorage.setItem("groups", JSON.stringify(groups));
      return groups;
    }
  },
);

export const profileSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setSelectedEmployees: (state, action) => {
      state.selectedEmployees = action.payload;
    },
    addSelectedEmployer: (state, action) => {
      state.selectedEmployees.push(action.payload);
    },
    removeSelectedEmployer: (state, action) => {
      const index = state.selectedEmployees.findIndex(
        employer => employer.email === action.payload,
      );
      state.selectedEmployees.splice(index, 1);
    },

    updateGroup: (state, action) => {
      const index = state.groups.findIndex(
        group => group.id === action.payload.id,
      );
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
      state.selectedGroupId = "";
    },
    setSelectedGroupId: (state, action) => {
      const selectedGroup = state.groups.find(
        group => group.id === action.payload,
      );
      state.selectedGroupId = action.payload;
      if (selectedGroup) {
        state.selectedEmployees = selectedGroup.employees;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.selectedEmployees = [];
    });
    builder.addCase(updateGroup.fulfilled, (state, action) => {
      state.groups = action.payload;
    });
  },
});

export const {
  setEmployees,
  addSelectedEmployer,
  removeSelectedEmployer,
  setSelectedEmployees,
  setSelectedGroupId,
} = profileSlice.actions;

//Selectors
export const groupsSelector = (state: any) => state.groups.groups;
export const selectedGroupSelector = (state: any) =>
  state.groups.groups.find(
    (group: IGroup) => group.id === state.groups.selectedGroupId,
  );
export const employeesSelector = (state: any) => state.groups.employees;
export const selectedEmployeesSelector = (state: any) =>
  state.groups.selectedEmployees;

export default profileSlice.reducer;
