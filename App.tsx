import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

import BottomTabNavigator from "./src/Navigators/BottomTabNavigator";
import { store } from "./src/store";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Host>
        <Provider store={store}>
          <BottomTabNavigator />
        </Provider>
      </Host>
    </GestureHandlerRootView>
  );
};

export default App;
