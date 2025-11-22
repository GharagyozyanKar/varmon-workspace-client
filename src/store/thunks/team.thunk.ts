import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../api/user";
import type { NewUserData, User } from "../../types";
import { inviteUser } from "../../api/auth";
import { AxiosError } from "axios";

export const fetchTeamData = createAsyncThunk('team/fetchTeamData', async (_, { signal, rejectWithValue }) => {
    try {
        const response = await getUsers(signal);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addUserThunk = createAsyncThunk(
    "team/fetchTeamData/addUser",
    async(newUser: NewUserData, { rejectWithValue }) => {
        try {
            const response = await inviteUser(newUser);
            return response.payload as User;
        } catch (error) {
            if(error instanceof AxiosError) return rejectWithValue(error.response?.data);
            return rejectWithValue(error)
        }
    }
)