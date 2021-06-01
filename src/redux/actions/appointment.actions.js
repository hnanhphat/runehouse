import api from "../../apiService";
import * as types from "../constants/appointment.constants";
import { toast } from "react-toastify";

const getListOfAppointments = (pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LIST_REQUEST });
    console.log(`/appointments?page=${pageNumber + option}`);
    const res = await api.get(`/appointments?page=${pageNumber + option}`);
    dispatch({
      type: types.GET_LIST_SUCCESS,
      payload: {
        data: res,
        totalPages: res.data.data.totalPages,
      },
    });
  } catch (error) {
    dispatch({ type: types.GET_LIST_FAILURE, payload: error.message });
  }
};

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
  getListOfAppointments,
  sendAppointment,
};
