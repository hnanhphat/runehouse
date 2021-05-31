import * as types from "../constants/order.constants";

const initialState = {
  orders: [],
  singleOrders: [],
  totalPages: 1,
  loading: false,
  error: "",
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_LIST_REQUEST:
    case types.GET_SINGLE_REQUEST:
    case types.EDIT_SINGLE_REQUEST:
    case types.DELETE_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_ORDER_FAILURE:
    case types.GET_LIST_FAILURE:
    case types.GET_SINGLE_FAILURE:
    case types.EDIT_SINGLE_FAILURE:
    case types.DELETE_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.CREATE_ORDER_SUCCESS:
      state.loading = false;
      break;
    case types.GET_LIST_SUCCESS:
      state.orders = payload.data;
      state.totalPages = payload.totalPages;
      state.loading = false;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleOrders = payload;
      state.loading = false;
      break;
    case types.EDIT_SINGLE_SUCCESS:
      state.loading = false;
      break;
    case types.DELETE_SINGLE_SUCCESS:
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default cartReducer;
