import api from "../../apiService";
import { routeActions } from "./route.actions";
import * as types from "../constants/auth.constants";
import { toast } from "react-toastify";

const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST, payload: null });
    const res = await api.post("/users", data);
    dispatch(routeActions.redirect("/"));
    dispatch({ type: types.REGISTER_SUCCESS, payload: res });
    toast.success(res.data.message + ". Please check mail to verify account.");
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error.message });
  }
};

const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    const res = await api.post("/auth/login", data);
    console.log(res);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    localStorage.setItem("isAdmin", res.data.data.user.isAdmin);
    localStorage.setItem("language", "vn");
    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    dispatch(routeActions.redirect("/"));
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: {
        accessToken: res.data.data.accessToken,
        isAdmin: res.data.data.user.isAdmin,
      },
    });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error.message });
  }
};

const loginWithFb = (access_token) => async (dispatch) => {
  try {
    dispatch({ type: types.FACEBOOK_REQUEST, payload: null });
    const res = await api.post("/auth/login/facebook", { access_token });
    console.log(res);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    localStorage.setItem("isAdmin", res.data.data.user.isAdmin);
    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    dispatch(routeActions.redirect("/"));
    dispatch({
      type: types.FACEBOOK_SUCCESS,
      payload: {
        accessToken: res.data.data.accessToken,
        isAdmin: res.data.data.user.isAdmin,
      },
    });
  } catch (error) {
    dispatch({ type: types.FACEBOOK_FAILURE, payload: error.message });
  }
};

const loginWithGg = (access_token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_REQUEST, payload: null });
    const res = await api.post("/auth/login/google", { access_token });
    console.log(res);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    localStorage.setItem("isAdmin", res.data.data.user.isAdmin);
    api.defaults.headers["authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    dispatch(routeActions.redirect("/"));
    dispatch({
      type: types.GOOGLE_SUCCESS,
      payload: {
        accessToken: res.data.data.accessToken,
        isAdmin: res.data.data.user.isAdmin,
      },
    });
  } catch (error) {
    dispatch({ type: types.GOOGLE_FAILURE, payload: error.message });
  }
};

const logout = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGOUT_REQUEST, payload: null });
    dispatch(routeActions.redirect("/"));
    dispatch({ type: types.LOGOUT_SUCCESS, payload: null });
  } catch (error) {
    dispatch({ type: types.LOGOUT_FAILURE, payload: error.message });
  }
};

const verify = (code) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGOUT_REQUEST, payload: null });
    const res = await api.post("/users/verify", { code });
    dispatch({ type: types.LOGOUT_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.LOGOUT_FAILURE, payload: error.message });
  }
};

export const authActions = {
  register,
  login,
  loginWithFb,
  loginWithGg,
  logout,
  verify,
};
