export interface RegisterInput {
  username: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  roleId: number;
  status: string;
  created_by: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface adminUserInput {
  userId: number;
  username: string;
  type: string;
  password: string;
}

export interface adminInput {
  username: string;
  password: string;
}

export interface roleInput {
  name: string;
  description: string;
}
