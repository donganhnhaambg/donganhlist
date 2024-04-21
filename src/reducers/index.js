import { combineReducers } from "redux";
import DarkMode from "./darkmode";
import UserInfor from "./userinfor";

const rootReducer = combineReducers({
  darkmode: DarkMode,
  userinfor: UserInfor,
});

export default rootReducer;
