import { api, handleRequest } from "."
import type { IResponse } from "../types"


export const getDashboardData = async (signal?: AbortSignal): Promise<IResponse> => {
    return await handleRequest(api.get("main/dashboard", { signal }))
}

export const getProfileData = async(userId: string | number, signal: AbortSignal): Promise<IResponse> => {
    return await handleRequest(api.get(`main/profile/${userId}`, {signal}))
}