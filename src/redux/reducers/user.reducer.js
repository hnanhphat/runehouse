import * as types from "../constants/user.constants";

const initialState = {
  allUser: [],
  currentUser: [],
  singleUser: [],
  totalPages: 1,
  loading: false,
  error: "",
  currentPage: 1,
  friendship: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_LIST_REQUEST:
    case types.GET_USER_REQUEST:
    case types.GET_SINGLE_REQUEST:
    case types.UPDATE_USER_REQUEST:
      state.loading = true;
      break;
    case types.GET_LIST_FAILURE:
    case types.GET_USER_FAILURE:
    case types.GET_SINGLE_FAILURE:
    case types.UPDATE_USER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.GET_LIST_SUCCESS:
      state.allUser = payload.data;
      state.totalPages = payload.totalPages;
      state.loading = false;
      break;
    case types.GET_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      state.currentUser = payload;
      state.loading = false;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleUser = payload;
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default userReducer;
