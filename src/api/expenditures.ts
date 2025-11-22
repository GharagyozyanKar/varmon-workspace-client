import { api, handleRequest } from "."
import type { Expenditure, IResponse } from "../types"

export const addExpenditure = async (caseId: string | number, data: Partial<Expenditure>): Promise<IResponse> => {
    return await handleRequest(api.post(`expenditure/add/case/${caseId}`, data))
}


export const getExpendituresByCaseId = async (caseId: string | number): Promise<IResponse> => {
    return await handleRequest(api.get(`expenditure/get/all/case/${caseId}`))
}

export const deleteExpenditure = async (id: string | number): Promise<IResponse> => {
    return await handleRequest(api.delete(`expenditure/${id}`))
}



