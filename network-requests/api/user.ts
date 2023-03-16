import axios from "network-requests/axios";
import { IUser, IUserRequest, IUserResponse } from "network-requests/types";

export const getAllUsers = ({
  page = 1,
  limit = 20,
}: {
  page: number;
  limit: number;
}): Promise<IUserResponse> =>
  axios
    .get<IUserResponse>(`/user/all?page=${page}&limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const createUser = (user: IUserRequest): Promise<IUser> =>
  axios
    .post<IUser>("/user/create", user)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getMyself = (): Promise<any> =>
  axios
    .get<any>("/user")
    .then((response) => response.data?.user)
    .catch((error) => {
      throw error;
    });

export const logout = (): Promise<any> =>
  axios
    .post<any>("/auth/logout")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
