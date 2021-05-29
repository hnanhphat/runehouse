import * as types from "../constants/news.constants";

const initialState = {
  news: [],
  search: [],
  totalPages: 1,
  loading: false,
  error: "",
  singleNews: [],
  comment: [],
};

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_LIST_REQUEST:
    case types.CREATE_REACTION_REQUEST:
    case types.CREATE_REVIEW_REQUEST:
      state.loading = true;
      break;
    case types.GET_LIST_FAILURE:
    case types.CREATE_REACTION_FAILURE:
    case types.CREATE_REVIEW_FAILURE:
      state.loading = false;
      break;
    case types.GET_LIST_SUCCESS:
      state.news = payload.data;
      state.totalPages = payload.totalPages;
      state.loading = false;
      break;
    case types.CREATE_REACTION_SUCCESS:
    case types.CREATE_REVIEW_SUCCESS:
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default newsReducer;
