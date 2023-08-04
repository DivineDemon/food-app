import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk("get/Items", async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/item/all`, {
    method: "GET",
  });

  const data = await response.json();
  return data.response;
});

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
          state.message = "Data Not Found!";
        } else {
          state.loading = false;
          state.items = action.payload;
          state.error = false;
        }
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message;
      });
  },
});

export default itemSlice.reducer;
