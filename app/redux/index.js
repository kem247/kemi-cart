import { combineReducers } from "redux";
import productsReducer from "./products";
import cartReducer from "./cart";
import singleProductReducer from "./singleProduct";
import singleCartReducer from "./singleCart";

const appReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  singleProduct: singleProductReducer,
  singleCart: singleCartReducer
});

export default appReducer;
