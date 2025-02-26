import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Auth slice'ı içe aktar

const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer'ı store'a ekle
  },
});

export default store;
