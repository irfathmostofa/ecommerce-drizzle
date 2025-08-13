export interface RegisterInput {
  username: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  status?: string;
  created_by?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface adminUserInput {
  user_id: string;
  username: string;
  type: string;
  password: string;
}

export interface adminInput {
  username: string;
  password: string;
}
