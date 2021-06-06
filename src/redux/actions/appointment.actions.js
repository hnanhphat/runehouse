import api from "../../apiService";
import * as types from "../constants/appointment.constants";
import { toast } from "react-toastify";

const getListOfAppointments =
  (pageNumber, option, loading) => async (dispatch) => {
    try {
      dispatch({ type: types.GET_LIST_REQUEST, payload: loading });
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

const getSingleAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_REQUEST });
    const res = await api.get(`/appointments/${id}`);
    dispatch({ type: types.GET_SINGLE_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_FAILURE, payload: error.message });
  }
};

const editAppointment = (data, id, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_SINGLE_REQUEST, payload: null });
    const res = await api.put(`/appointments/${id}`, data);
    dispatch({ type: types.EDIT_SINGLE_SUCCESS, payload: res });
    dispatch(getListOfAppointments(pageNumber, option));
    // dispatch(getUserOrders(pageNumber, option));
  } catch (error) {
    dispatch({ type: types.EDIT_SINGLE_FAILURE, payload: error.message });
  }
};

const deleteAppointment = (id, pageNumber, option) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SINGLE_REQUEST, payload: null });
    const res = await api.delete(`/appointments/${id}`);
    dispatch({ type: types.DELETE_SINGLE_SUCCESS, payload: res });
    dispatch(getListOfAppointments(pageNumber, option));
    // dispatch(getUserOrders(pageNumber, option));
  } catch (error) {
    dispatch({ type: types.DELETE_SINGLE_FAILURE, payload: error.message });
  }
};

export const appointmentActions = {
  getListOfAppointments,
  sendAppointment,
  getSingleAppointment,
  editAppointment,
  deleteAppointment,
};
