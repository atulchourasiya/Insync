import { apiEndPoint } from "@/utils/apiEndPoint";
import { apiRequestController } from "@/utils/apiRequestController";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  name: string;
  picture: string;
  role: string;
  status: string;
}
const initialState: UserState = {
  email: "",
  name: "Guest",
  picture: "",
  role: "",
  status: "",
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async () => {
    const response = await apiRequestController(apiEndPoint.getUser);
    return response;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // Add an empty reducers object
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.picture = action.payload.picture;
        state.role = action.payload.role;
        state.status = action.payload.status;
      })
  },
});

export const userReducer = userSlice.reducer;
