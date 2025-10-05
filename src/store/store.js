// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import app from "./appSlice"; // Import reducer của bạn
const isDev = import.meta.env.MODE !== "production";
// Tạo store
export const store = configureStore({
  reducer: {
    app,
  },
  devTools: isDev,
});


