import { User } from "./User";

export interface RefreshToken {
  token: string;
  userId: string;
}

export interface RefreshTokenModel extends RefreshToken {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
