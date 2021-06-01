import * as types from "../constants/appointment.constants";

const initialState = {
  appointments: [],
  totalPages: 1,
  loading: false,
  error: "",
};

const appointmentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_LIST_REQUEST:
    case types.SEND_APPOINTMENT_REQUEST:
      state.loading = true;
      break;
    case types.GET_LIST_FAILURE:
    case types.SEND_APPOINTMENT_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    case types.GET_LIST_SUCCESS:
      state.appointments = payload.data;
      state.totalPages = payload.totalPages;
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
