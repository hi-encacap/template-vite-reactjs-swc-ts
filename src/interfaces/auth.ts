import { Dayjs } from "dayjs";

import { UserRole } from "@constants/auth";
import { Gender } from "@constants/common";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  birthDay?: Date | Dayjs | string;
  gender: Gender;
  address?: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
