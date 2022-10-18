import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Api/axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const response = await axios.get("product/products");
  return response.data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = state.products.concat(action.payload).reverse();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllProducts = (state) => state.product.products;
export default productSlice.reducer;
