import axios from "axios";
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/`;

//Register user
const register = async (userData: RegisterRequest) => {
  const response = await axios.post<RegisterResponse>(
    API_URL + "register/",
    userData
  );
  if (response.data) {
    //localStorage.setItem('user',JSON.stringify(response.data))
    localStorage.setItem("user", response.data.token);
  }
  console.log(response.data);
  return response.data;
};
//Login user
const login = async (userData: LoginRequest) => {
  console.log("GOTO", API_URL + "login");
  const response = await axios.post<LoginResponse>(API_URL + "login", userData);
  if (response.data) {
    //localStorage.setItem('user',JSON.stringify(response.data))
    localStorage.setItem("user", response.data.token);
  }
  console.log(response.data);
  return response.data;
};
//Logout user
const logout = () => {
  localStorage.setItem("user", "");
};

function authHeader(token?: string) {
  if (token === undefined) {
    token = localStorage.getItem("user") || "";
  }

  return token
    ? {
        Authorization: "Bearer " + localStorage.getItem("user"),
      }
    : {};
}
//Get me
const getMe = async () => {
  const token = localStorage.getItem("user");
  console.log(`Send ${token} to ${API_URL}me`);

  if (!token) {
    return null;
  }
  const response = await axios.get<ResultResponse<{ data: UserData }>>(
    API_URL + "me",
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getMe,
  authHeader,
};
export default authService;
