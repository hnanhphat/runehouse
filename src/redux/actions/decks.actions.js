import api from "../../apiService";
import { routeActions } from "./route.actions";
import * as types from "../constants/decks.constants";
import { toast } from "react-toastify";

const createDecks = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DECKS_REQUEST, payload: null });
    const res = await api.post(`/decks`, data);
    dispatch(routeActions.redirect("/"));
    dispatch({ type: types.CREATE_DECKS_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.CREATE_DECKS_FAILURE, payload: error.message });
  }
};

const getListOfDecks = (pageNumber, option, storage) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST });
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

const editDecks = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_SINGLE_REQUEST, payload: null });
    const res = await api.put(`/decks/${id}`, data);
    dispatch(routeActions.redirect("/products"));
    dispatch({ type: types.EDIT_SINGLE_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.EDIT_SINGLE_FAILURE, payload: error.message });
  }
};

const deleteDecks = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SINGLE_REQUEST, payload: null });
    const res = await api.delete(`/decks/${id}`);
    dispatch({ type: types.DELETE_SINGLE_SUCCESS, payload: res });
    dispatch(routeActions.redirect("/products"));
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.DELETE_SINGLE_FAILURE, payload: error.message });
  }
};

export const decksActions = {
  createDecks,
  getListOfDecks,
  getSingleDecks,
  removeSearch,
  editDecks,
  deleteDecks,
};
