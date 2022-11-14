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
export const createProduct = createAsyncThunk("product/create", async (formData) => {
  const response = await axios.post("product/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("???? ", response);
  return response.data;
});

// add remove product
export const deleteSelectedProduct = createAsyncThunk("product", async (productId) => {
  try {
    const response = await axios.delete(`product/${productId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updateSelectedProduct = createAsyncThunk("product/update", async (product) => {
  try {
    const response = await axios.patch(
      `product/update/${product.productId}`,
      product.updatedProduct,
      "efwef"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
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
        state.status = "succeeded";
        state.products = state.products.concat(action.payload).reverse();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSelectedProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSelectedProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product.id !== parseInt(action.payload.id, 10)
        );
      })
      .addCase(deleteSelectedProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateSelectedProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSelectedProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.concat(action.payload).reverse();
      })
      .addCase(updateSelectedProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllProducts = (state) => state.product.products;
export default productSlice.reducer;
