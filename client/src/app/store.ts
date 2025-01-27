// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../components/ui/loadingscreen/LoadingSlice";
import { userReducer } from "@/components/authentication/userSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user : userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
