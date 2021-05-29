import api from "../../apiService";
import * as types from "../constants/news.constants";

const getListOfNews = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST });
    const res = await api.get(`/news?page=${pageNumber + option}`);
    dispatch({
      type: types.GET_LIST_SUCCESS,
      payload: {
        data: res,
        totalPages: res.data.data.totalPages,
      },
    });
  } catch (error) {
    dispatch({ type: types.GET_LIST_FAILURE, payload: error.message });
  }
};

const createReaction = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REACTION_REQUEST, payload: null });
    const res = await api.post(`/reaction`, data);
    dispatch({ type: types.CREATE_REACTION_SUCCESS, payload: res });
    dispatch(getListOfNews());
  } catch (error) {
    dispatch({ type: types.CREATE_REACTION_FAILURE, payload: error.message });
  }
};

const createReview = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
    const res = await api.post(`/review`, data);
    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: res });
    dispatch(getListOfNews());
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error.message });
  }
};

export const newsActions = {
  getListOfNews,
  createReaction,
  createReview,
};
