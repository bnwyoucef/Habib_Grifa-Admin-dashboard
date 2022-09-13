import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Api/axios";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const response = await axios.get("order/orders");

  return response.data;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.orders = state.orders.concat(action.payload);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllOrders = (state) => state.order.orders;
export default orderSlice.reducer;
