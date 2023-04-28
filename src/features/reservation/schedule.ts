import axios from "axios";
import { authStore } from "../auth/authStore";
const API_URL = "http://localhost:5555/api/v1/calendar/";

const getSchedule = async () => {
  const response = await axios.get(API_URL, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${authStore.get().user}`,
    },
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
