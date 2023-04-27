import axios from "axios";
import { authStore } from "../auth/authStore";
const API_URL = "http://localhost:5555/api/v1/reservations/";

const getAllReservations = async () => {
  const response = await axios.get<
    ResultResponse<{ count: number; data: ReservationResponse[] }>
  >(API_URL, {
    headers: {
      Authorization: `Bearer ${authStore.user}`,
    },
  });
  return response.data;
};

const reservationService = {
  getAllReservations,
};

export default reservationService;
