import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: sessionStorage.getItem("loading") != "false",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    hideLoading: (state) => {
      state.isLoading = false;
      sessionStorage.setItem("loading", "false");
    },
  },
});

export const loadingReducer = loadingSlice.reducer;
export const { hideLoading } = loadingSlice.actions;
