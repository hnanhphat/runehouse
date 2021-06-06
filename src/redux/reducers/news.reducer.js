import * as types from "../constants/news.constants";

const initialState = {
  news: [],
  search: [],
  singleNews: [],
  comment: [],
  totalPages: 1,
  loadingList: false,
  loadingSingle: false,
  loading: false,
  error: "",
};

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // CREATE NEWS
    case types.CREATE_NEWS_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_NEWS_SUCCESS:
      state.loading = false;
      break;
    case types.CREATE_NEWS_FAILURE:
      state.loading = false;
      break;

    // GET LIST
    case types.GET_LIST_REQUEST:
      state.loadingList = payload;
      break;
    case types.GET_LIST_SUCCESS:
      state.news = payload.data;
      state.totalPages = payload.totalPages;
      state.loadingList = false;
      break;
    case types.GET_LIST_FAILURE:
      state.loadingList = false;
      break;

    // GET SINGLE ITEM
    case types.GET_SINGLE_REQUEST:
      state.loadingSingle = payload;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleNews = payload;
      state.loadingSingle = false;
      break;
    case types.GET_SINGLE_FAILURE:
      state.loadingSingle = false;
      break;

    // CREATE REACTION
    case types.CREATE_REACTION_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_REACTION_SUCCESS:
      state.loading = false;
      break;
    case types.CREATE_REACTION_FAILURE:
      state.loading = false;
      break;

    // CREATE REVIEW
    case types.CREATE_REVIEW_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_REVIEW_SUCCESS:
      state.loading = false;
      break;
    case types.CREATE_REVIEW_FAILURE:
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
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default newsReducer;
