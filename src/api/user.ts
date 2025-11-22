import { api, handleRequest } from ".";
import type { IResponse, User } from "../types";


export const getUserById = async (id: string | number, signal?: AbortSignal): Promise<IResponse> => {
  return await handleRequest(api.get(`user/${id}`, { signal }))
}

export const getUsers = async (signal?: AbortSignal): Promise<IResponse> => {
  return await handleRequest(api.get("user/all", { signal }))
}

export const deleteUser = async (id: string | number): Promise<IResponse> => {
  return await handleRequest(api.delete(`user/${id}`));
} 

export const updateUser = async (id: string | number, data: User): Promise<IResponse> => {
  return await handleRequest(api.put(`user/${id}`, data));
}

export const getUserByActivationToken = async (userId: string | number): Promise<IResponse> => {
  return await handleRequest(api.get(`user/activation/${userId}`));
}