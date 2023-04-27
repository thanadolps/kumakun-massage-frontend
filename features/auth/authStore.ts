"use client";

import { map } from "nanostores";
import authService from "./authService";

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

export const authStore = map(initialState);

export async function register(user: RegisterRequest) {
  console.log("Registering user = ", user);
  authStore.setKey("isLoading", true);

  try {
    const token = (await authService.register(user)).token;
    authStore.set({
      ...authStore.get(),
      user: token,
      isLoading: false,
      isSuccess: true,
    });
  } catch (error) {
    const message = errorMessage(error);

    authStore.set({
      ...authStore.get(),
      isLoading: false,
      isError: true,
      message,
      user: null,
    });
  }
}

export async function login(user: LoginRequest) {
  console.log("Login user = ", user);
  authStore.setKey("isLoading", true);

  try {
    const token = (await authService.login(user)).token;
    authStore.set({
      ...authStore.get(),
      user: token,
      isLoading: false,
      isSuccess: true,
    });
  } catch (error) {
    const message = errorMessage(error);
    authStore.set({
      ...authStore.get(),
      isLoading: false,
      isError: true,
      message,
      user: null,
    });
  }
}

export async function logout() {
  authStore.setKey("isLoading", true);

  await authService.logout();

  authStore.set({
    ...authStore.get(),
    user: null,
    isLoading: false,
    isSuccess: true,
  });
}

export function reset() {
  authStore.set({
    ...authStore.get(),
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  });
}

function errorMessage(error: any): string {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
}
