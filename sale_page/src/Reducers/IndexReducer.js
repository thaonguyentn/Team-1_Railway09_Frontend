import loginreducer from "./LoginReducer";
import { combineReducers } from "redux";
const RootReducer = combineReducers({
  loginreducer: loginreducer,
});
export default RootReducer;
