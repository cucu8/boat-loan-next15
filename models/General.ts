export interface IdParams {
  params: {
    id: string;
  };
}

export interface LoginSuccessResponse {
  token: string;
  user: { id: number; email: string; userType: number; name: string };
}
