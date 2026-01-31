export interface User {
  email: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}
