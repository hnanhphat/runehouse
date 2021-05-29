import api from "../../apiService";
import * as types from "../constants/card.constants";

const createCard = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_CARD_REQUEST, payload: null });
    const res = await api.post(`/card`, data);
    dispatch({ type: types.CREATE_CARD_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.CREATE_CARD_FAILURE, payload: error.message });
  }
};

const getListOfCards = (option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST });
    console.log(`/card${option}`);
    const res = await api.get(`/card${option}`);
    dispatch({
      type: types.GET_LIST_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({ type: types.GET_LIST_FAILURE, payload: error.message });
  }
};

const getRandomCard = (count) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_RANDOM_REQUEST });
    const res = await api.get(`/card/${count}`);
    dispatch({ type: types.GET_RANDOM_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_RANDOM_FAILURE, payload: error.message });
  }
};

const removeCard = () => async (dispatch) => {
  dispatch({ type: types.REMOVE_CARD });
};

export const cardActions = {
  createCard,
  getListOfCards,
  getRandomCard,
  removeCard,
};
