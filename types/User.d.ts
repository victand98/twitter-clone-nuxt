export interface User {
  username: string;
  email: string;
  password: string;
  name?: string;
  profileImage?: string;
}

export interface UserModel extends User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
