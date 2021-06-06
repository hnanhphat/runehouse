import api from "../../apiService";
import * as types from "../constants/decks.constants";
import { toast } from "react-toastify";

const createDecks = (data, pageNumber, option, storage) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DECKS_REQUEST, payload: null });
    const res = await api.post(`/decks`, data);
    dispatch({ type: types.CREATE_DECKS_SUCCESS, payload: res });
    toast.success(res.data.message);
    dispatch(getListOfDecks(pageNumber, option, storage, false));
  } catch (error) {
    dispatch({ type: types.CREATE_DECKS_FAILURE, payload: error.message });
  }
};

const getListOfDecks =
  (pageNumber, option, storage, loading) => async (dispatch) => {
    try {
      dispatch({ type: types.GET_LIST_REQUEST, payload: loading });
      const res = await api.get(`/decks?page=${pageNumber + option}`);
      dispatch({
        type: types.GET_LIST_SUCCESS,
        payload: {
          data: res,
          totalPages: res.data.data.totalPages,
          storage: storage,
        },
      });
    } catch (error) {
      dispatch({ type: types.GET_LIST_FAILURE, payload: error.message });
    }
  };

const getSingleDecks = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_REQUEST });
    const res = await api.get(`/decks/${id}`);
    dispatch({ type: types.GET_SINGLE_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_FAILURE, payload: error.message });
  }
};

const removeSearch = () => (dispatch) => {
  dispatch({ type: types.REMOVE_SEARCH });
};

const editDecks =
  (data, id, pageNumber, option, storage) => async (dispatch) => {
    try {
      dispatch({ type: types.EDIT_SINGLE_REQUEST, payload: null });
      const res = await api.put(`/decks/${id}`, data);
      dispatch({ type: types.EDIT_SINGLE_SUCCESS, payload: res });
      toast.success(res.data.message);
      dispatch(getListOfDecks(pageNumber, option, storage, false));
    } catch (error) {
      dispatch({ type: types.EDIT_SINGLE_FAILURE, payload: error.message });
    }
  };

const deleteDecks = (id, pageNumber, option, storage) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SINGLE_REQUEST, payload: null });
    const res = await api.delete(`/decks/${id}`);
    dispatch({ type: types.DELETE_SINGLE_SUCCESS, payload: res });
    toast.success(res.data.message);
    dispatch(getListOfDecks(pageNumber, option, storage, false));
  } catch (error) {
    dispatch({ type: types.DELETE_SINGLE_FAILURE, payload: error.message });
  }
};

const searchDecks = (data) => (dispatch) => {
  dispatch({ type: types.SEARCH_DECKS, payload: data });
};

const cateDecks = (data) => (dispatch) => {
  dispatch({ type: types.CATE_DECKS, payload: data });
};

export const decksActions = {
  createDecks,
  getListOfDecks,
  getSingleDecks,
  removeSearch,
  editDecks,
  deleteDecks,
  searchDecks,
  cateDecks,
};
