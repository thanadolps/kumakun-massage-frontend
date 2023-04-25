import authService from "./authService";
import { proxy } from "valtio";

type State = {
  user: string | null | RegisterResponse | LoginResponse;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: State = {
  user:
    (typeof window !== "undefined" && window.localStorage.getItem("user")) ||
    null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authStore = proxy(initialState);

export async function register(user: RegisterRequest) {
  console.log("Registering user = ", user);
  authStore.isLoading = true;

  try {
    authStore.user = await authService.register(user);
    authStore.isLoading = false;
    authStore.isSuccess = true;
  } catch (error) {
    const message = errorMessage(error);

    authStore.isLoading = false;
    authStore.isError = true;
    authStore.message = message;
    authStore.user = null;
  }
}

export async function login(user: LoginRequest) {
  console.log("Login user = ", user);
  authStore.isLoading = true;

  try {
    authStore.user = await authService.login(user);
    authStore.isLoading = false;
    authStore.isSuccess = true;
  } catch (error) {
    const message = errorMessage(error);
    authStore.isLoading = false;
    authStore.isError = true;
    authStore.message = message;
    authStore.user = null;
  }
}

export async function logout() {
  authStore.isLoading = true;
  await authService.logout();
  authStore.isLoading = false;
  authStore.isSuccess = true;
  authStore.user = null;
}

export function reset() {
  authStore.isError = false;
  authStore.isSuccess = false;
  authStore.isLoading = false;
  authStore.message = "";
}

function errorMessage(error: any): string {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
}
