import api from "../../apiService";
import { routeActions } from "./route.actions";
import { cartActions } from "./cart.actions";
import * as types from "../constants/order.constants";
import { toast } from "react-toastify";

const createOrder = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST, payload: null });
    const res = await api.post(`/order`, data);
    dispatch(routeActions.redirect("/orders"));
    dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: res });
    toast.success(res.data.message);
    dispatch(cartActions.getUserCart(1, "&isOrdered=false"));
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAILURE, payload: error.message });
  }
};

const getAllOrders = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST });
    const res = await api.get(`/order?page=${pageNumber + option}`);
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

const getUserOrders = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_USER_REQUEST });
    const res = await api.get(`/order/me?page=${pageNumber + option}`);
    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: {
        data: res,
        totalPages: res.data.data.totalPages,
      },
    });
  } catch (error) {
    dispatch({ type: types.GET_USER_FAILURE, payload: error.message });
  }
};

const getSingleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_REQUEST });
    const res = await api.get(`/order/${id}`);
    dispatch({ type: types.GET_SINGLE_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_FAILURE, payload: error.message });
  }
};

const editOrder = (data, id, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_SINGLE_REQUEST, payload: null });
    const res = await api.put(`/order/${id}`, data);
    dispatch({ type: types.EDIT_SINGLE_SUCCESS, payload: res });
    dispatch(getAllOrders(pageNumber, option));
    dispatch(getUserOrders(pageNumber, option));
  } catch (error) {
    dispatch({ type: types.EDIT_SINGLE_FAILURE, payload: error.message });
  }
};

const deleteOrder = (id, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SINGLE_REQUEST, payload: null });
    const res = await api.delete(`/order/${id}`);
    dispatch({ type: types.DELETE_SINGLE_SUCCESS, payload: res });
    dispatch(getAllOrders(pageNumber, option));
    dispatch(getUserOrders(pageNumber, option));
  } catch (error) {
    dispatch({ type: types.DELETE_SINGLE_FAILURE, payload: error.message });
  }
};

export const orderActions = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getSingleOrder,
  editOrder,
  deleteOrder,
};
