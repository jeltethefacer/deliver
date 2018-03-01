import { combineReducers } from "redux";
import user from "./word";
import register from "./register";
import items from "./items";
import basket from "./basket";
import checkout from "./checkout";
const deliverApp = combineReducers({
  register,
  user,
  items,
  basket,
  checkout
});
export default deliverApp;
