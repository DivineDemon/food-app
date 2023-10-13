import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  message: "",
  items: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload.message;
    },
  },
});

export const { setLoading, setItems, setError } = itemSlice.actions;
export default itemSlice.reducer;
