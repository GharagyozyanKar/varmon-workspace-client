import { api, handleRequest } from "."
import type { IResponse, Note } from "../types"

export const addNote = async (caseId: string | number, data: Partial<Note>): Promise<IResponse> => {
    return await handleRequest(api.post(`note/add/case/${caseId}`, data))
}


export const getNotesByCaseId = async (caseId: string | number): Promise<IResponse> => {
    return await handleRequest(api.get(`note/get/all/case/${caseId}`))
}

export const deleteNote = async (id: string | number): Promise<IResponse> => {
    return await handleRequest(api.delete(`note/${id}`))
}



