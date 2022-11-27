import { configureStore } from "@reduxjs/toolkit";

import groupsReducer from "./slices/groups";
import profileReducer from "./slices/profile";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    groups: groupsReducer,
  },
});
