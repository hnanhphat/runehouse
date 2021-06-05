import * as types from "../constants/decks.constants";

const initialState = {
  decks: [],
  sale: [],
  search: [],
  totalPages: 1,
  loading: false,
  error: "",
  searchField: "",
  cateField: "All",
  selectedDecks: null,
  singleDecks: [],
  comment: [],
};

const decksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // CREATE
    case types.CREATE_DECKS_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_DECKS_SUCCESS:
      state.loading = false;
      break;
    case types.CREATE_DECKS_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET LIST
    case types.GET_LIST_REQUEST:
      state.loading = true;
      break;
    case types.GET_LIST_SUCCESS:
      state[payload.storage] = payload.data;
      state.totalPages = payload.totalPages;
      state.loading = false;
      break;
    case types.GET_LIST_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET SINGLE
    case types.GET_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleDecks = payload;
      state.loading = false;
      break;
    case types.GET_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // REMOVE
    case types.REMOVE_SEARCH:
      state.search = [];
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
      state.singleDecks = {};
      state.loading = false;
      break;
    case types.DELETE_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // SEARCH
    case types.SEARCH_DECKS:
      state.searchField = payload;
      state.loading = false;
      break;

    // CATE
    case types.CATE_DECKS:
      state.cateField = payload;
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default decksReducer;
