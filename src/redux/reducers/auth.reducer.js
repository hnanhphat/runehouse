import * as types from "../constants/auth.constants";

const initialState = {
  isAuth: localStorage.getItem("accessToken"),
  isAdmin: localStorage.getItem("isAdmin"),
  loading: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // REGISTER
    case types.REGISTER_REQUEST:
      state.loading = true;
      break;
    case types.REGISTER_SUCCESS:
      state.loading = false;
      break;
    case types.REGISTER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // LOGIN
    case types.LOGIN_REQUEST:
    case types.FACEBOOK_REQUEST:
    case types.GOOGLE_REQUEST:
      state.loading = true;
      break;
    case types.LOGIN_SUCCESS:
    case types.FACEBOOK_SUCCESS:
    case types.GOOGLE_SUCCESS:
      state.isAuth = payload.accessToken;
      state.isAdmin = payload.isAdmin;
      state.loading = false;
      break;
    case types.LOGIN_FAILURE:
    case types.FACEBOOK_FAILURE:
    case types.GOOGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // LOGOUT
    case types.LOGOUT_REQUEST:
      state.loading = true;
      break;
    case types.LOGOUT_SUCCESS:
      state.isAuth = "";
      state.isAdmin = "";
      state.loading = false;
      break;
    case types.LOGOUT_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // VERIFY
    case types.VERIFY_REQUEST:
      state.loading = true;
      break;
    case types.VERIFY_SUCCESS:
      state.loading = false;
      break;
    case types.VERIFY_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // CHECK ROLE
    case types.CHECK_CURRENT_ROLE:
      state.isAdmin = payload;
      break;

    default:
      return state;
  }

  return { ...state };
};

export default authReducer;
