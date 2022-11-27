import React from "react";

import { Host } from "react-native-portalize";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

import BottomTabNavigator from "./src/Navigators/BottomTabNavigator";
import { store } from "./src/store";

const App = () => {
  return (
    <Host>
      <Provider store={store}>
        <BottomTabNavigator />
      </Provider>
    </Host>
  );
};

export default App;
