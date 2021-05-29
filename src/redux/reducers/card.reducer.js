import * as types from "../constants/card.constants";

const initialState = {
  cards: [],
  random: [],
  loading: false,
  error: "",
};

const cardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_CARD_REQUEST:
    case types.GET_LIST_REQUEST:
    case types.GET_RANDOM_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_CARD_FAILURE:
    case types.GET_LIST_FAILURE:
    case types.GET_RANDOM_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.CREATE_CARD_SUCCESS:
      state.loading = false;
      break;
    case types.GET_LIST_SUCCESS:
      state.cards = payload;
      state.loading = false;
      break;
    case types.GET_RANDOM_SUCCESS:
      state.random = payload;
      state.loading = false;
      break;
    case types.REMOVE_CARD:
      state.random = [];
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default cardReducer;
