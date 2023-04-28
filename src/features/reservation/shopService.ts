import axios from "axios";
import authService from "../auth/authService";
import { authStore } from "../auth/authStore";
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/massageShops/`;

//Get all massage shops
const getAllMassageShops = async () => {
  const response = await axios.get<ResultResponse<{ data: MassageShop[] }>>(
    API_URL
  );
  return response.data;
};

// Get massage shop by id
const getMassageShop = async (id: string) => {
  const response = await axios.get<ResultResponse<{ data: MassageShop }>>(
    API_URL + id
  );
  return response.data;
};

const makeReservation = async (reservation: ReservationRequest) => {
  const { massageShopId, datetime } = reservation;
  const response = await axios.post(
    API_URL + `${massageShopId}/reservations`,
    {
      datetime,
    },
    {
      headers: authService.authHeader(),
    }
  );
  return response.data;
};

const shopService = {
  getAllMassageShops,
  getMassageShop,
  makeReservation,
};
export default shopService;
