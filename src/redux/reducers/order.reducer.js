import * as types from "../constants/order.constants";

const initialState = {
  orders: [],
  totalPages: 1,
  loading: false,
  error: "",
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_ORDER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.CREATE_ORDER_SUCCESS:
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default cartReducer;
