import { combineReducers } from "redux";
import user from "./word";
import register from "./register";
const deliverApp = combineReducers({
  register,
  user
});
export default deliverApp;
