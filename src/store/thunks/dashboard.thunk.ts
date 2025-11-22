import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardData } from "../../api/mainPage";
import type { IDashboardState } from "../types";
import { changeCaseStatus, toggleCasePaid } from "../../api/case";

export const getDashboardDataThunk = createAsyncThunk(
    "dashboard/fetchData",
    async (_, { signal, rejectWithValue }) => {
        try {
            const response = await getDashboardData(signal);
            return response.payload as IDashboardState;
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.name === "CanceledError" || err.name === "AbortError") {
                    return rejectWithValue("aborted");
                }
                return rejectWithValue(err.message || "Failed to fetch dashboard data");
            }
        }
    }
);

export const setCasePaidThunk = createAsyncThunk(
    "dashboard/unpaidCases/setPaid",
    async (caseId: number | string, { rejectWithValue }) => {
        try {
            const response = await toggleCasePaid(caseId);
            return response.payload;
        } catch(err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message || "Failed to set case paid");
            }
        }
    }
)

export const setCaseStatusClosedThunk = createAsyncThunk(
    "dashboard/completedCases/setStatusClosed",
    async (caseId: number | string, { rejectWithValue }) => {
        try {
            const result = await changeCaseStatus(caseId, 'closed');
            if(result.status === 'error'){
                return rejectWithValue(result.message || "Failed to set case status closed");
            }
            return result.payload;
        
        } catch(err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message || "Failed to set case status closed");
            }
        }
    }
)
