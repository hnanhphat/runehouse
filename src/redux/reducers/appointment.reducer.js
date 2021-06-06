import * as types from "../constants/appointment.constants";

const initialState = {
  appointments: [],
  singleAppointment: [],
  totalPages: 1,
  loading: false,
  loadingList: false,
  loadingSingle: false,
  error: "",
};

const appointmentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // LIST
    case types.GET_LIST_REQUEST:
      state.loadingList = payload;
      break;
    case types.GET_LIST_SUCCESS:
      state.appointments = payload.data;
      state.totalPages = payload.totalPages;
      state.loadingList = false;
      break;
    case types.GET_LIST_FAILURE:
      state.error = payload;
      state.loadingList = false;
      break;

    // SEND
    case types.SEND_APPOINTMENT_REQUEST:
      state.loading = true;
      break;
    case types.SEND_APPOINTMENT_SUCCESS:
      state.loading = false;
      break;
    case types.SEND_APPOINTMENT_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // GET SINGLE
    case types.GET_SINGLE_REQUEST:
      state.loadingSingle = true;
      break;
    case types.GET_SINGLE_SUCCESS:
      state.singleAppointment = payload;
      state.loadingSingle = false;
      break;
    case types.GET_SINGLE_FAILURE:
      state.error = payload;
      state.loadingSingle = false;
      break;

    // EDIT
    case types.EDIT_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.EDIT_SINGLE_SUCCESS:
      state.loading = false;
      break;
    case types.EDIT_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    // DELETE
    case types.DELETE_SINGLE_REQUEST:
      state.loading = true;
      break;
    case types.DELETE_SINGLE_SUCCESS:
      state.loading = false;
      break;
    case types.DELETE_SINGLE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default appointmentReducer;
