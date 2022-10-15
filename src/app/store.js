import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../features/order/orderSlice";
import categoryReducer from "../features/category/categorySlice";

export default configureStore({
  reducer: {
    order: orderReducer,
    category: categoryReducer,
  },
});
