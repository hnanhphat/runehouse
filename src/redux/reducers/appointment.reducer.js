import * as types from "../constants/appointment.constants";

const initialState = {
  friends: [],
  received: [],
  totalPages: 1,
  loading: false,
  error: "",
};

const appointmentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SEND_APPOINTMENT_REQUEST:
      state.loading = true;
      break;
    case types.SEND_APPOINTMENT_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.SEND_APPOINTMENT_SUCCESS:
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default appointmentReducer;
