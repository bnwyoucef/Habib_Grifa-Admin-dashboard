import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Api/axios";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk("category/fetch", async () => {
  const response = await axios.get("category/all");
  console.log(response.data);
  return response.data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export const selectAllCategories = (state) => state.category.categories;
export default categorySlice.reducer;
