import axios from "axios";
const API_URL = "http://localhost:5555/api/v1/massageShops/";

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
    `${API_URL}/${id}`
  );
  return response.data;
};

const shopService = {
  getAllMassageShops,
  getMassageShop,
};
export default shopService;
