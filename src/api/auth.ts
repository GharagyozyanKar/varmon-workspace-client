import { api, handleRequest } from ".";
import type { IActivationData, ILoginData, IResponse, NewUserData } from "../types";


export const loginUser = async (user: ILoginData): Promise<IResponse> => {
  return await handleRequest(api.post("auth/login", user))
};

export const activateUser = async (token: string, data: IActivationData): Promise<IResponse> => {
  return await handleRequest(api.post(`auth/activate?token=${token}`, data))
}  

export const getCurrentUser = async (): Promise<IResponse> => {
  return await handleRequest(api.get("auth/current"))
};

export const logoutUser = async (): Promise<IResponse> => {
  return await handleRequest(api.post("auth/logout"))
};

export const inviteUser = async (newUser: NewUserData): Promise<IResponse> => {
  return await handleRequest(api.post("auth/invite", {newUser} ))
};

export const forgotPassword = async (email: string): Promise<IResponse> => {
  return await handleRequest(api.post("auth/forgot-password", { email }))
};

export const resetPassword = async (token: string, password: string): Promise<IResponse> => {
  return await handleRequest(api.patch(`auth/reset-password?token=${token}`, { password }))
};

export const verifyToken = async (token: string): Promise<IResponse> => {
  return await handleRequest(api.get(`auth/verify-token?token=${token}`))
};

export const updatePassword = async (old_password: string, new_password: string): Promise<IResponse> => {
  return await handleRequest(api.patch("auth/update-password", { old_password, new_password }))
};