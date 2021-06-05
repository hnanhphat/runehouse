import * as types from "../constants/user.constants";

const initialState = {
  allUser: [],
  currentUser: [],
  singleUser: [],
  totalPages: 1,
  loading: false,
  singleLoading: false,
  error: "",
  currentPage: 1,
  friendship: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // GET LIST USER
    case types.GET_LIST_REQUEST:
      state.loading = true;
      break;
    case types.GET_LIST_SUCCESS:
      state.allUser = payload.data;
      state.totalPages = payload.totalPages;
      state.loading = false;
      break;
    case types.GET_LIST_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET CURRENT USER
    case types.GET_USER_REQUEST:
      state.loading = true;
      break;
    case types.GET_USER_SUCCESS:
      state.currentUser = payload;
      state.loading = false;
      break;
    case types.GET_USER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET SINGLE USER
    case types.GET_SINGLE_REQUEST:
      state.singleLoading = true;
      break;
    case types.GET_SINGLE_FAILURE:
      state.error = payload;
      state.singleLoading = false;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleUser = payload;
      state.singleLoading = false;
      break;

    // UPDATE USER
    case types.UPDATE_USER_REQUEST:
      state.loading = true;
      break;
    case types.UPDATE_USER_SUCCESS:
      state.loading = false;
      break;
    case types.UPDATE_USER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // REMOVE CURRENT
    case types.REMOVE_CURRENT_USER:
      state.currentUser = [];
      state.loading = false;
      break;

    default:
      break;
  }

  return { ...state };
};

export default userReducer;
