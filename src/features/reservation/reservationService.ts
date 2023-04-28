import axios from "axios";
import authService from "../auth/authService";
import { authStore } from "../auth/authStore";
const API_URL = "http://localhost:5555/api/v1/reservations/";

const getAllReservations = async () => {
  const response = await axios.get<
    ResultResponse<{ count: number; data: ReservationResponse[] }>
  >(API_URL, {
    headers: authService.authHeader(),
  });
  return response.data;
};

const updateReservation = async (
  id: string,
  data: Partial<ReservationRequest>
) => {
  const response = await axios.put(API_URL + id, data, {
    headers: authService.authHeader(),
  });
  return response.data;
};

const deleteReservation = async (id: string) => {
  const response = await axios.delete(API_URL + id, {
    headers: authService.authHeader(),
  });
  return response.data;
};

const reservationService = {
  getAllReservations,
  deleteReservation,
  updateReservation,
};

export default reservationService;
