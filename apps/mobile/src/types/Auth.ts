// src/types/Auth.ts
import { User } from "./User";

export interface LoginResponse {
  token: string;
  user: User;
}
