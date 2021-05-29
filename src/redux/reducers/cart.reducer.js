import * as types from "../constants/cart.constants";

const initialState = {
  carts: [],
  cart: [],
  totalPages: 1,
  loading: false,
  error: "",
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_CART_REQUEST:
    case types.GET_USER_CART_REQUEST:
    case types.UPDATE_CART_REQUEST:
    case types.DELETE_CART_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_CART_FAILURE:
    case types.GET_USER_CART_FAILURE:
    case types.UPDATE_CART_FAILURE:
    case types.DELETE_CART_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.CREATE_CART_SUCCESS:
      state.loading = false;
      break;
    case types.GET_USER_CART_SUCCESS:
      state.carts = payload.data;
      state.totalPages = payload.totalPages;
      state.loading = false;
      break;
    case types.UPDATE_CART_SUCCESS:
      state.loading = false;
      break;
    case types.DELETE_CART_SUCCESS:
      state.cart = {};
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default cartReducer;
