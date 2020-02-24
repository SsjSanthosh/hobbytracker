import bookReducer from "./Books/bookReducer";
import authReducer from "./Auth/authReducer";
import { combineReducers } from "redux";
import alertReducer from "./Alert/alertReducer";
export default combineReducers({
  books: bookReducer,
  auth: authReducer,
  alert: alertReducer
});
