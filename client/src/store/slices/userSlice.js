import { register, login } from "../api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  user: {},
  token: "",
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.success;
        state.message = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state.user, action.payload.user);
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.error.message;
      });
  },
});

export default userSlice.reducer;
