import api from "../../apiService";
import * as types from "../constants/appointment.constants";
import { toast } from "react-toastify";

const sendAppointment = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: types.SEND_APPOINTMENT_REQUEST, payload: null });
    const res = await api.post(`/appointments/add/${id}`, data);
    dispatch({ type: types.SEND_APPOINTMENT_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({ type: types.SEND_APPOINTMENT_FAILURE, payload: error.message });
  }
};

export const appointmentActions = {
  sendAppointment,
};
