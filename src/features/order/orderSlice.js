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

export const removeOrder = createAsyncThunk("order/removeOrder", async (orderId) => {
  const response = await axios.delete(`order/delete/${orderId}`);
  return response.data;
});

export const confirmOrder = createAsyncThunk("order/confirmOrder", async (orderId) => {
  const response = await axios.patch(`order/update/${orderId}`);
  return response.data;
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
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
      })
      .addCase(removeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.orders = state.orders.filter((order) => order.id !== action.payload.id);
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(confirmOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addOrder } = orderSlice.actions;
export const selectAllOrders = (state) => state.order.orders;
export default orderSlice.reducer;
