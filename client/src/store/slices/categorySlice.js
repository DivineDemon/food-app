import { fetchCategories } from "../api";
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.error = true;
          state.loading = false;
          state.message = "Categories Not Found!";
        } else {
          state.loading = false;
          state.categories = action.payload;
          state.error = false;
          state.message = "";
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message;
      });
  },
});

export default categorySlice.reducer;
