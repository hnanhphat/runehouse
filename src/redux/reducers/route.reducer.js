import * as types from "../constants/route.constants";

const initialState = {
  redirectTo: null,
};

const routeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // REDIRECT TO
    case types.REDIRECT_TO:
      state.redirectTo = payload;
      break;

    // REMOVE REDIRECT TO
    case types.REMOVE_REDIRECT_TO:
      state.redirectTo = null;
      break;
    default:
      break;
  }

  return { ...state };
};

export default routeReducer;
