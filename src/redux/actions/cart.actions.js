import api from "../../apiService";
import * as types from "../constants/cart.constants";
import { toast } from "react-toastify";

const createCart = (data, txt) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_CART_REQUEST, payload: null });
    const res = await api.post(`/cart`, data);
    dispatch({ type: types.CREATE_CART_SUCCESS, payload: res });
    dispatch(getUserCart(1, "&isOrdered=false"));
    toast.success(txt);
  } catch (error) {
    dispatch({ type: types.CREATE_CART_FAILURE, payload: error.message });
  }
};

const getUserCart = (pageNumber, option, loading) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_USER_CART_REQUEST, payload: loading });
    const res = await api.get(`/cart?page=${pageNumber + option}`);
    dispatch({
      type: types.GET_USER_CART_SUCCESS,
      payload: {
        data: res,
        totalPages: res.data.data.totalPages,
      },
    });
  } catch (error) {
    dispatch({ type: types.GET_USER_CART_FAILURE, payload: error.message });
  }
};

const updateCart = (data, id, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_REQUEST, payload: null });
    const res = await api.put(`/cart/${id}`, data);
    dispatch({ type: types.UPDATE_CART_SUCCESS, payload: res });
    dispatch(getUserCart(pageNumber, option, false));
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_FAILURE, payload: error.message });
  }
};

const deleteCart = (id, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_REQUEST, payload: null });
    const res = await api.delete(`/cart/${id}`);
    dispatch({ type: types.DELETE_CART_SUCCESS, payload: res });
    dispatch(getUserCart(pageNumber, option, false));
  } catch (error) {
    dispatch({ type: types.DELETE_CART_FAILURE, payload: error.message });
  }
};

export const cartActions = {
  createCart,
  getUserCart,
  updateCart,
  deleteCart,
};
