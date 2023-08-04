import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("get/Categories", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/category/all`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data.response;
});

const initialState = {
  loading: false,
  error: false,
  categories: [],
  category: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
