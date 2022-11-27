import { createSlice } from "@reduxjs/toolkit";

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
    createGroup: (state, action) => {
      state.groups.push(action.payload);
      state.selectedEmployees = [];
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
});

export const {
  setEmployees,
  addSelectedEmployer,
  removeSelectedEmployer,
  setSelectedEmployees,
  createGroup,
  setSelectedGroupId,
  updateGroup,
} = profileSlice.actions;

//Selectors
export const groupsSelector = state => state.groups.groups;
export const selectedGroupSelector = state =>
  state.groups.groups.find(group => group.id === state.groups.selectedGroupId);
export const employeesSelector = state => state.groups.employees;
export const selectedEmployeesSelector = state =>
  state.groups.selectedEmployees;

export default profileSlice.reducer;
