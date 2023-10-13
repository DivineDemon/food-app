import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  message: null,
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
});

export default categorySlice.reducer;
