export type UserRole = "CUSTOMER" | "EVENT_ORGANIZER";

export interface User {
  id?: number;
  name: string;
  password: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  data: object;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  referralCode?: string;
}
