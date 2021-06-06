import * as types from "../constants/order.constants";

const initialState = {
  orders: [],
  userOrders: [],
  singleOrders: [],
  totalPages: 1,
  loadingList: false,
  loading: false,
  loadingSingle: false,
  error: "",
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // CREATE
    case types.CREATE_ORDER_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_ORDER_SUCCESS:
      state.loading = false;
      break;
    case types.CREATE_ORDER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    //GET LIST
    case types.GET_LIST_REQUEST:
      state.loadingList = true;
      break;
    case types.GET_LIST_SUCCESS:
      state.orders = payload.data;
      state.totalPages = payload.totalPages;
      state.loadingList = false;
      break;
    case types.GET_LIST_FAILURE:
      state.error = payload;
      state.loadingList = false;
      break;

    // GET USER ORDER
    case types.GET_USER_REQUEST:
      state.loadingList = true;
      break;
    case types.GET_USER_SUCCESS:
      state.userOrders = payload.data;
      state.totalPages = payload.totalPages;
      state.loadingList = false;
      break;
    case types.GET_USER_FAILURE:
      state.error = payload;
      state.loadingList = false;
      break;

    // GET SINGLE
    case types.GET_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleOrders = payload;
      state.loading = false;
      break;
    case types.GET_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // EDIT
    case types.EDIT_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.EDIT_SINGLE_SUCCESS:
      state.loading = false;
      break;
    case types.EDIT_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // DELETE
    case types.DELETE_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.DELETE_SINGLE_SUCCESS:
      state.loading = false;
      break;
    case types.DELETE_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    default:
      break;
  }

  return { ...state };
};

export default cartReducer;
