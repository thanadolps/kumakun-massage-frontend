import axios from "axios";
import authService from "../auth/authService";
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/calendar/`;

const getSchedule = async () => {
  const response = await axios.get(API_URL, {
    responseType: "blob",
    headers: authService.authHeader(),
  });
  return response.data;
};

const downloadSchedule = async () => {
  const blob = await getSchedule();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "schedule.csv");
  document.body.appendChild(link);
  link.click();

  link.remove();
  URL.revokeObjectURL(url);
};

const scheduleService = {
  getSchedule,
  downloadSchedule,
};

export default scheduleService;
