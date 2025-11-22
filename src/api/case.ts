import { api, handleRequest } from "."
import type { Case, CaseStatus, IArchiveFilterConfig, IResponse } from "../types"

export const addCase = async (caseData: Case): Promise<IResponse> => {
    return await handleRequest(api.post("cases", { caseData }))
}

export const getCurrentCases = async (signal?: AbortSignal): Promise<IResponse> => {
    return await handleRequest(api.get("cases/current", { signal }))
}



export const deleteCase = async (id: string | number): Promise<IResponse> => {
    return await handleRequest(api.delete(`cases/case/${id}`))
}


export const updateCase = async (id: string | number, newCase: Case): Promise<IResponse> => {
    return await handleRequest(api.put(`cases/${id}`, newCase))
}

export const changeCaseStatus = async (id: string | number, status: CaseStatus): Promise<IResponse> => {
    return await handleRequest(api.patch(`cases/status/${id}`, { status }))
}

export const toggleCasePaid = async (id: string | number): Promise<IResponse> => {
    return await handleRequest(api.patch(`cases/paid/${id}`));
}

export const assignCase = async (caseId: string | number, userId: string | number | null): Promise<IResponse> => {
    return await handleRequest(api.patch(`cases/assign/${caseId}`, {userId}))
}

export const getCaseById = async (id: string | number): Promise<IResponse> => {
    return await handleRequest(api.get(`cases/case/${id}`))
}


export const getComplatedCases = async (): Promise<IResponse> => {
    return await handleRequest(api.get("cases/complated"))
}

export const getUnpaidCases = async (): Promise<IResponse> => {
    return await handleRequest(api.get("cases/unpaid"))
}

export const getWaitingCases = async (): Promise<IResponse> => {
    return await handleRequest(api.get(`cases/get/waiting`));
};

export const uploadFile = async (fromData: FormData, caseId: string | number, onProgress: (percent: number) => void): Promise<IResponse> => {
    return await handleRequest(api.post(`file/upload/${caseId}`, fromData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percent);
            }
        }
    }))
}

export const getCaseFiles = async (caseId: string | number): Promise<IResponse> => {
    return await handleRequest(api.get(`file/all/${caseId}`))
}

export const deleteFile = async (fileId: string | number): Promise<IResponse> => {
    return await handleRequest(api.delete(`file/delete/${fileId}`))
}

export const downloadFile = async (fileId: string | number) => {
    try {
        const response = await api.get(`file/download/${fileId}`, {
            responseType: "blob",
        });

        const disposition = response.headers?.["content-disposition"] || response.headers?.["Content-Disposition"];
        let filename = `file_${fileId}`;

        if (disposition) {
            const fileNameMatch = /filename\*?=(?:UTF-8'')?["']?([^;"']+)/i.exec(disposition);
            if (fileNameMatch && fileNameMatch[1]) {
                filename = decodeURIComponent(fileNameMatch[1]);
            }
        }

        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (err) {
        console.error("Download failed", err);
    }
};

export const getArchiveCases = async (signal?: AbortSignal, config?: IArchiveFilterConfig): Promise<IResponse> => {
    return await handleRequest(api.get(`cases/archive`, {
        params: config,
        signal
    }));
};

export const getUserCurrentCases = async (userId: string | number): Promise<IResponse> => {
    return await handleRequest(api.get(`cases/current/${userId}`));
};

export const getUserWaitingCases = async (userId: string | number): Promise<IResponse> => {
    return await handleRequest(api.get(`cases/waiting/${userId}`));
};


export const getUserArchiveCases = async (userId: string | number, config: IArchiveFilterConfig, signal?: AbortSignal): Promise<IResponse> => {
    return await handleRequest(api.get(`cases/archive/${userId}`, {
        params: config,
        signal
    }))
}

export const getUserCases = async (userId: string | number, signal: AbortSignal): Promise<IResponse> => {
    return await handleRequest(api.get(`cases/user/${userId}`, {signal}));    
}
export const getUserProfileCases = async (userId: string | number, signal?: AbortSignal): Promise<IResponse> => {
    return await handleRequest(api.get(`cases/user/profile/${userId}`, {signal}));
}