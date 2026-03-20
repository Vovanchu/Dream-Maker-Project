export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  full_name: string;
  email: string;
  password: string;
  role: string;
};

export type LoginDataResponse = {
  access_token: string;
  token_type: string;
};
