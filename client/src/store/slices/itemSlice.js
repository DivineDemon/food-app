import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk("get/Items", async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/item/all`, {
    method: "GET",
  });

  const data = await response.json();
  return data.response;
});

const itemSlice = createSlice({
  name: "item",
  initialState: {
    loading: false,
    error: false,
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default itemSlice.reducer;
