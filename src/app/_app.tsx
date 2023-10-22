"use client";
import React from "react";
import "./globals.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "@/redux"; // Import your Redux store and persistor
const { store, persistor } = reduxStore();
function MyApp({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
