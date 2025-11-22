import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../../api/user";
import { getUserProfileCases } from "../../api/case";
import { getUserStats, getUserYearlyCasesCount } from "../../api/profile";

export const getUserByIdThunk = createAsyncThunk(
    'profile/getUserByIdThunk',
    async (userId: string | number, { signal, rejectWithValue }) => {
        try {
            const response = await getUserById(userId, signal);
            return response.payload;
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

export const getUserStatsThunk = createAsyncThunk(
    'profile/getUserStatsThunk',
    async (userId: string | number, { rejectWithValue }) => {
        try {
            const response = await getUserStats(userId);
            return response.payload;
        }catch(error){
            return rejectWithValue(error);
        }
    }
)
export const getUserYearlyCasesCountThunk = createAsyncThunk(
    'profile/getUserYearlyCasesCountThunk',
    async (userId: string | number, { rejectWithValue }) => {
        try {
            const response = await getUserYearlyCasesCount(userId);
            return response.payload;
        }catch(error){
            return rejectWithValue(error);
        }
    }
)
export const getUserProfileCasesThunk = createAsyncThunk(
    'profile/getUserProfileCasesThunk',
    async (userId: string | number, { signal, rejectWithValue }) => {
        try {
            const response = await getUserProfileCases(userId, signal);
            return response.payload;
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

