import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCase, assignCase, changeCaseStatus, deleteCase, getArchiveCases, getCurrentCases, getUserArchiveCases, getUserCases } from "../../api/case";
import type { Case, CaseStatus, IArchiveCasesPayload, IArchiveFilterConfig, IResponse, Role } from "../../types";
import { AxiosError } from "axios";

export const getCurrentCasesThunk = createAsyncThunk(
    'cases/getCurrentCasesThunk',
    async (_, { signal, rejectWithValue }) => {
        try {
            const response = await getCurrentCases(signal);
            return response.payload;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const getArchiveCasesThunk = createAsyncThunk<
    IArchiveCasesPayload,
    IArchiveFilterConfig,
    { rejectValue: unknown }
>(
    "cases/getArchiveCasesThunk",
    async (config, { signal, rejectWithValue }) => {
        try {
            const response = await getArchiveCases(signal, config);
            return response.payload as IArchiveCasesPayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getUserCasesThunk = createAsyncThunk(
    'workscpace/fetchData',
    async (userId: number | string, { signal, rejectWithValue }) => {
        try {
            const response = await getUserCases(userId, signal);
            return response.payload;
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.name === "CanceledError" || err.name === "AbortError") {
                    return rejectWithValue("aborted");
                }
                return rejectWithValue(err.message || "Failed to fetch workspace data");
            }
        }
    }
);

export const getUserArchiveCasesThunk = createAsyncThunk<
    IArchiveCasesPayload,
    { userId: string | number; config: IArchiveFilterConfig },
    { rejectValue: unknown }
>(
    "cases/getUserArchiveCasesThunk",
    async ({ userId, config }, { signal, rejectWithValue }) => {
        try {
            const response = await getUserArchiveCases(userId, config, signal);
            return response.payload as IArchiveCasesPayload;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteCaseThunk = createAsyncThunk(
    'cases/deleteCaseThunk',
    async ({ caseId, mode = 'default' }: { caseId: number | string, mode?: 'default' | 'archive' }, { rejectWithValue }) => {
        try {
            await deleteCase(caseId);
            return { caseId, mode };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)


export const addCaseThunk = createAsyncThunk(
    'cases/addCaseThunk',
    async (caseData: Case, { rejectWithValue }) => {
        try {
            const response = await addCase(caseData);
            return response.payload as Case;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)
export const changeCaseStatusThunk = createAsyncThunk<
    { case: Case; userRole: Role },
    { caseId: string | number; status: CaseStatus; userRole: Role },
    { rejectValue: IResponse | unknown }
>(
    'case/changeStatusThunk',
    async ({ caseId, status, userRole }, { rejectWithValue }) => {
        try {
            const response = await changeCaseStatus(caseId, status);
            return { case: response.payload as Case, userRole };
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data as IResponse);
            }
            return rejectWithValue(err);
        }
    }
);


export const setAssignmentThunk = createAsyncThunk(
    'cases/setAssignmentThunk',
    async ({ caseId, userId, }: { caseId: number | string, userId: number | string }, { rejectWithValue }) => {
        try {
            const response = await assignCase(caseId, userId);
            if (response.status === 'error') {
                return rejectWithValue(response.message || "Failed to set assignment");
            }
            return response.payload as Case;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message || "Failed to set assignment");
            }
            return rejectWithValue(err);
        }
    }
)