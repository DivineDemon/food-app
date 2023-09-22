import { createSlice } from "@reduxjs/toolkit";
import { fetchItems, fetchCategoryItems, fetchSearchItems } from "../api";

const initialState = {
  loading: false,
  error: false,
  message: "",
  items: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.loading = false;
          state.items = [];
          state.error = true;
          state.message = "Items Not Found!";
        } else {
          state.loading = false;
          state.items = action.payload;
          state.error = false;
        }
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message;
      })
      .addCase(fetchCategoryItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryItems.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.loading = false;
          state.items = [];
          state.error = true;
          state.message = "Items Not Found!";
        } else {
          state.loading = false;
          state.items = action.payload;
          state.error = false;
        }
      })
      .addCase(fetchCategoryItems.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message;
      })
      .addCase(fetchSearchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchItems.fulfilled, (state, action) => {
        if (action.payload === undefined) {
          state.loading = false;
          state.items = [];
          state.error = true;
          state.message = "Items Not Found!";
        } else {
          state.loading = false;
          state.items = action.payload;
          state.error = false;
        }
      })
      .addCase(fetchSearchItems.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message;
      });
  },
});

export default itemSlice.reducer;
