import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../../Api/axios";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk("category/fetch", async () => {
  const response = await axios.get("category/all");
  return response.data;
});

export const createCategory = createAsyncThunk("category/create", async (name) => {
  const response = await axios.post("category/create", { categoryName: name });
  return response.data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.concat(action.payload);
        toast.success("Catégorie ajoutée avec succès");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllCategories = (state) => state.category.categories;
export default categorySlice.reducer;
