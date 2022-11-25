import React from "react";

import { Provider } from "react-redux";

import BottomTabNavigator from "./src/Navigators/BottomTabNavigator";
import { store } from "./src/store";

const App = () => {
  return (
    <Provider store={store}>
      <BottomTabNavigator />
    </Provider>
  );
};

export default App;
