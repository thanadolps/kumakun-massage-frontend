import { map } from "nanostores";
import authService from "./authService";

type State = {
  user: UserData | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: State = {
  user: (await authService.getMe())?.data ?? null,
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
    await authService.register(user);
    authStore.set({
      ...authStore.get(),
      user: (await authService.getMe())?.data ?? null,
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
    await authService.login(user);
    authStore.set({
      ...authStore.get(),
      user: (await authService.getMe())?.data ?? null,
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
