import { combineReducers } from "redux";
import user from "./word";
import register from "./register";
import items from "./items";
import basket from "./basket";
import checkout from "./checkout";
import orders from "./orders";
import page from "./page";
const deliverApp = combineReducers({
  register,
  user,
  items,
  basket,
  checkout,
  orders,
  page
});
export default deliverApp;
