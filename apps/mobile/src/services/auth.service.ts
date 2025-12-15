import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiPost } from "./api";
import { User } from "../types/User";

interface LoginResponse {
  token: string;
  user: User;
}

export function registerUser(data: {
  nombre: string;
  email: string;
  password: string;
}) {
  return apiPost("/auth/register", data);
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await apiPost<LoginResponse>("/auth/login", data);

  return response;
}

export async function logoutUser() {
  await AsyncStorage.removeItem("token");
}
