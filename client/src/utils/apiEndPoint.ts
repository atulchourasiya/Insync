
export interface ApiEndpoint {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, string>;
}
export const apiEndPoint: Record<string, ApiEndpoint> = {
  googleLogin: {
    url: "auth/google",
    method: "GET",
  },
  refreshToken: {
    url: "auth/refresh_token",
    method: "POST",
  },
  ping: {
    url : 'ping',
    method : 'GET',
  },
} as const;
