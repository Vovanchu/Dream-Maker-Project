export type LoginData = {
  username: string;
  password: string;
};

export type RegisterData = {
  full_name: string;
  email: string;
  password: string;
  role: string;
  person_type: string;
};

export type LoginDataResponse = {
  access_token: string;
  token_type: string;
};
