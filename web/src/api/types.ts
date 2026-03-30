export type UserRole = "CUSTOMER" | "EVENT_ORGANIZER";

export interface User {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  address?: string | null;
  referralCode?: string;
  referredBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
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

export interface OrganizerProfile {
  id: number;
  name: string;
  email: string;
  address?: string | null;
  role: UserRole;
  referralCode?: string;
  referredBy?: string | null;
  createdAt: string;
  updatedAt: string;
  stats: {
    totalEvents: number;
    totalTransactions: number;
    totalAttendees: number;
  };
}
