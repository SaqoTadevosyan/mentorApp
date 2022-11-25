import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./slices/profile";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});
