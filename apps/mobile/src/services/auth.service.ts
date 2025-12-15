// src/services/auth.service.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiPost } from "./api";

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
  const response = await apiPost<{ token: string }>("/auth/login", data);
  await AsyncStorage.setItem("token", response.token);
  return response;
}

export async function logoutUser() {
  await AsyncStorage.removeItem("token");
}
