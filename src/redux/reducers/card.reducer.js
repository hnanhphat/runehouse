import * as types from "../constants/card.constants";

const initialState = {
  cards: [],
  single: [],
  random: [],
  loading: false,
  loadingSingle: false,
  error: "",
};

const cardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // CREATE
    case types.CREATE_CARD_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_CARD_SUCCESS:
      state.loading = false;
      break;
    case types.CREATE_CARD_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET LIST
    case types.GET_LIST_REQUEST:
      state.loading = true;
      break;
    case types.GET_LIST_SUCCESS:
      state.cards = payload;
      state.loading = false;
      break;
    case types.GET_LIST_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET SINGLE
    case types.GET_SINGLE_REQUEST:
      state.loadingSingle = true;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.single = payload;
      state.loadingSingle = false;
      break;
    case types.GET_SINGLE_FAILURE:
      state.error = payload;
      state.loadingSingle = false;
      break;

    // GET RANDOM
    case types.GET_RANDOM_REQUEST:
      state.loadingSingle = true;
      break;
    case types.GET_RANDOM_SUCCESS:
      state.random = payload;
      state.loadingSingle = false;
      break;
    case types.GET_RANDOM_FAILURE:
      state.error = payload;
      state.loadingSingle = false;
      break;

    // REMOVE CARD
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
