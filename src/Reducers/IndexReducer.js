import loginreducer from "./LoginReducer";
import cartreducer from "./Cartreducer";
import productreducer from "./ProductReducer";
import accountreducer from "./AccountReducer";
import orderreducer from "./OrderReducer";
import { combineReducers } from "redux";
const RootReducer = combineReducers({
  loginreducer: loginreducer,
  cart: cartreducer,
  productreducer: productreducer,
  accountreducer: accountreducer,
  orderreducer: orderreducer,
});
export default RootReducer;
