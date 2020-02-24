const initialState = { token: "", isAuthenticated: false, user: {} };

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOADED":
      return {
        ...state,
        user: { ...payload },
        isAuthenticated: true,
        token: localStorage.hobbytoken
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("hobbytoken", payload);
      return { ...state, token: payload.user, isAuthenticated: true };
    case "LOGOUT_USER":
      localStorage.removeItem("hobbytoken");
      return { ...state, token: "", isAuthenticated: false, user: {} };
    default:
      return state;
  }
};

export default authReducer;
