import api from "../../apiService";
import * as types from "../constants/user.constants";
import { toast } from "react-toastify";

const getListOfUsers = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST });
    const res = await api.get(`/users?page=${pageNumber + option}`);
    dispatch({
      type: types.GET_LIST_SUCCESS,
      payload: {
        data: res,
        totalPages: res.data.data.totalPages,
      },
    });
  } catch (error) {
    dispatch({ type: types.GET_LIST_FAILURE, payload: error.message });
  }
};

const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_USER_REQUEST, payload: null });
    const data = await api.get("/users/me");
    dispatch({ type: types.GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_USER_FAILURE, payload: error.message });
  }
};

const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_REQUEST, payload: null });
    const data = await api.get(`/users/${id}`);
    dispatch({ type: types.GET_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_FAILURE, payload: error.message });
  }
};

const updateCurrentUser =
  ({ username, avatar }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_USER_REQUEST, payload: null });
      const data = await api.put("/users", { username, avatar });
      dispatch({ type: types.UPDATE_USER_SUCCESS, payload: data });
      toast.success(data.data.message);
    } catch (error) {
      dispatch({ type: types.UPDATE_USER_FAILURE, payload: error.message });
    }
  };

export const userActions = {
  getListOfUsers,
  getCurrentUser,
  getSingleUser,
  updateCurrentUser,
};
