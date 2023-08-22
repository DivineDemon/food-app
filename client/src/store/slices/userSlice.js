import { register, login } from "../api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  user: {},
  token: "",
  isLoggedOut: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedOut: (state) => {
      state.isLoggedOut = !state.isLoggedOut;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state.user, action.payload);
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

export const { setLoggedOut } = userSlice.actions;
export default userSlice.reducer;
