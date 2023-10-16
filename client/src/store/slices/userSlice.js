import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  user: {},
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;

      if (action.payload.token) {
        state.token = action.payload.token;
      }
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.token = "";
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, setError, logout } = userSlice.actions;
export default userSlice.reducer;
