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
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = userSlice.actions;
export default userSlice.reducer;
