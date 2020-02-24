import setAuthToken from "../setAuthToken";
import { setAlert } from "./../Alert/alertActions";
const axios = require("axios");
export const registerUser = body => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let res = await axios.post("/auth/register", { ...body }, config);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: "REGISTER_FAIL" });
  }
};

export const loginUser = body => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    let res = await axios.post("/auth/login", { ...body }, config);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: "LOGIN_FAIL" });
  }
};

export const loadUser = () => async dispatch => {
  if (localStorage.hobbytoken) {
    setAuthToken(localStorage.hobbytoken);
  }
  try {
    const res = await axios.get("/auth");

    dispatch({ type: "USER_LOADED", payload: res.data });
    dispatch(setAlert("User logged in!", "success"));
  } catch (err) {
    dispatch({ type: "AUTH_ERROR" });
  }
};

export const logoutUser = () => async dispatch => {
  dispatch({ type: "LOGOUT_USER" });
};
