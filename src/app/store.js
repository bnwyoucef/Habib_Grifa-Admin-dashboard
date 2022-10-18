import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../features/order/orderSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";

export default configureStore({
  reducer: {
    order: orderReducer,
    category: categoryReducer,
    product: productReducer,
  },
});
