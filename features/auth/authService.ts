import axios from "axios";
const API_URL = "http://localhost:5555/api/v1/auth/";
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
const authService = {
  register,
  logout,
  login,
};
export default authService;
