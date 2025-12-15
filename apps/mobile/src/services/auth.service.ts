import { apiPost } from "./api";

export interface RegisterPayload {
  nombre: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

export function registerUser(data: RegisterPayload) {
  return apiPost<RegisterResponse>("/auth/register", data);
}
