import api from "../../apiService";
import * as types from "../constants/news.constants";
import { toast } from "react-toastify";

const createNews = (data, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_NEWS_REQUEST, payload: null });
    const res = await api.post(`/news`, data);
    dispatch({ type: types.CREATE_NEWS_SUCCESS, payload: res });
    toast.success(res.data.message);
    dispatch(getListOfNews(pageNumber, option));
  } catch (error) {
    dispatch({ type: types.CREATE_NEWS_FAILURE, payload: error.message });
  }
};

const getListOfNews = (pageNumber, option, loading) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST, payload: loading });
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

const getSingleNews = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_REQUEST });
    const res = await api.get(`/news/${id}`);
    dispatch({ type: types.GET_SINGLE_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_FAILURE, payload: error.message });
  }
};

const createReaction = (data, pageNumber, option, id) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REACTION_REQUEST, payload: null });
    const res = await api.post(`/reaction`, data);
    dispatch({ type: types.CREATE_REACTION_SUCCESS, payload: res });
    dispatch(getListOfNews(pageNumber, option, false));
    dispatch(getSingleNews(id));
  } catch (error) {
    dispatch({ type: types.CREATE_REACTION_FAILURE, payload: error.message });
  }
};

const createReview = (data, pageNumber, option, id) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
    const res = await api.post(`/review`, data);
    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: res });
    dispatch(getListOfNews(pageNumber, option, false));
    dispatch(getSingleNews(id));
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error.message });
  }
};

const editNews = (data, id, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_SINGLE_REQUEST, payload: null });
    const res = await api.put(`/news/${id}`, data);
    dispatch({ type: types.EDIT_SINGLE_SUCCESS, payload: res });
    toast.success(res.data.message);
    dispatch(getListOfNews(pageNumber, option, false));
  } catch (error) {
    dispatch({ type: types.EDIT_SINGLE_FAILURE, payload: error.message });
  }
};

const deleteNews = (id, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SINGLE_REQUEST, payload: null });
    const res = await api.delete(`/news/${id}`);
    dispatch({ type: types.DELETE_SINGLE_SUCCESS, payload: res });
    toast.success(res.data.message);
    dispatch(getListOfNews(pageNumber, option, false));
  } catch (error) {
    dispatch({ type: types.DELETE_SINGLE_FAILURE, payload: error.message });
  }
};

export const newsActions = {
  createNews,
  getListOfNews,
  getSingleNews,
  createReaction,
  createReview,
  editNews,
  deleteNews,
};
