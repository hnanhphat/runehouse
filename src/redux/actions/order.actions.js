import api from "../../apiService";
import { routeActions } from "./route.actions";
import { cartActions } from "./cart.actions";
import * as types from "../constants/order.constants";
import { toast } from "react-toastify";

const createOrder = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST, payload: null });
    const res = await api.post(`/order`, data);
    dispatch(routeActions.redirect("/"));
    dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: res });
    toast.success(res.data.message);
    dispatch(cartActions.getUserCart(1, "&isOrdered=false"));
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const orderActions = {
  createOrder,
};
