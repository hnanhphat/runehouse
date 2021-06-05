import * as types from "../constants/cart.constants";

const initialState = {
  carts: [],
  cart: [],
  totalPages: 1,
  loadingList: false,
  loading: false,
  error: "",
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // CREATE
    case types.CREATE_CART_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_CART_SUCCESS:
      state.loading = false;
      break;
    case types.CREATE_CART_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // USER CART
    case types.GET_USER_CART_REQUEST:
      state.loadingList = payload;
      break;
    case types.GET_USER_CART_SUCCESS:
      state.carts = payload.data;
      state.totalPages = payload.totalPages;
      state.loadingList = false;
      break;
    case types.GET_USER_CART_FAILURE:
      state.error = payload;
      state.loadingList = false;
      break;

    // UPDATE
    case types.UPDATE_CART_REQUEST:
      state.loading = true;
      break;
    case types.UPDATE_CART_SUCCESS:
      state.loading = false;
      break;
    case types.UPDATE_CART_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // DELETE
    case types.DELETE_CART_REQUEST:
      state.loading = true;
      break;
    case types.DELETE_CART_SUCCESS:
      state.cart = {};
      state.loading = false;
      break;
    case types.DELETE_CART_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    default:
      break;
  }

  return { ...state };
};

export default cartReducer;
