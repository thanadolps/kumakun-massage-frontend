import axios from "axios";
import { authStore } from "../auth/authStore";
const API_URL = "http://localhost:5555/api/v1/reservations/";

const makeReservation = async (reservation: ReservationRequest) => {
  // TODO: WTF
  const { massageShopId, ...rest } = reservation;

  const response = await axios.post(API_URL + massageShopId, rest, {
    headers: {
      Authorization: `Bearer ${authStore.user}`,
    },
  });
  return response.data;
};

const reservationService = {
  makeReservation,
};

export default reservationService;
