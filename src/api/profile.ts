import { api, handleRequest } from "."
import type { IResponse } from "../types"

export const getUserStats = async (userId: string | number): Promise<IResponse> => {
    return await handleRequest(api.get(`stats/${userId}`))
}

export const getUserYearlyCasesCount = async (userId: string | number): Promise<IResponse> => {
    return await handleRequest(api.get(`stats/user/year/cases/${userId}`));
}

