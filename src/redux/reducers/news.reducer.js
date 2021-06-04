import * as types from "../constants/news.constants";

const initialState = {
  news: [],
  search: [],
  totalPages: 1,
  loadingList: false,
  loading: false,
  error: "",
  singleNews: [],
  comment: [],
};

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_NEWS_REQUEST:
    case types.GET_SINGLE_REQUEST:
    case types.CREATE_REACTION_REQUEST:
    case types.CREATE_REVIEW_REQUEST:
    case types.EDIT_SINGLE_REQUEST:
    case types.DELETE_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_NEWS_FAILURE:
    case types.GET_SINGLE_FAILURE:
    case types.CREATE_REACTION_FAILURE:
    case types.CREATE_REVIEW_FAILURE:
    case types.EDIT_SINGLE_FAILURE:
    case types.DELETE_SINGLE_FAILURE:
      state.loading = false;
      break;
    case types.CREATE_NEWS_SUCCESS:
      state.loading = false;
      break;
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
    case types.GET_SINGLE_SUCCESS:
      state.singleNews = payload;
      state.loading = false;
      break;
    case types.CREATE_REACTION_SUCCESS:
    case types.CREATE_REVIEW_SUCCESS:
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

export default newsReducer;
