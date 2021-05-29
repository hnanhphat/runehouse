import * as types from "../constants/decks.constants";

const initialState = {
  decks: [],
  sale: [],
  search: [],
  totalPages: 1,
  loading: false,
  error: "",
  selectedDecks: null,
  singleDecks: [],
  comment: [],
};

const decksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_DECKS_REQUEST:
    case types.GET_LIST_REQUEST:
    case types.GET_SINGLE_REQUEST:
    case types.EDIT_SINGLE_REQUEST:
    case types.DELETE_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_DECKS_FAILURE:
    case types.GET_LIST_FAILURE:
    case types.GET_SINGLE_FAILURE:
    case types.EDIT_SINGLE_FAILURE:
    case types.DELETE_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.CREATE_DECKS_SUCCESS:
      state.loading = false;
      break;
    case types.GET_LIST_SUCCESS:
      state[payload.storage] = payload.data;
      state.totalPages = payload.totalPages;
      state.loading = false;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleDecks = payload;
      state.loading = false;
      break;
    case types.REMOVE_SEARCH:
      state.search = [];
      break;
    case types.EDIT_SINGLE_SUCCESS:
      state.loading = false;
      break;
    case types.DELETE_SINGLE_SUCCESS:
      state.singleDecks = {};
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default decksReducer;
