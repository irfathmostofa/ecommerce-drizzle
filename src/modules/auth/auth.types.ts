export interface RegisterInput {
  username: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  status?: string;
  createdby?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
