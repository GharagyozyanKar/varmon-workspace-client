import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserState } from "../types";
import type { User } from "../../types";
import { addUserThunk, fetchTeamData } from "../thunks/team.thunk";




const initialState: IUserState = {
    users: [],
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
        },
        updateUserInfo(state, action: PayloadAction<User>) {
            state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user)
        },
        incrementUserCaseCount(state, action: PayloadAction<number | string>) {
            const user = state.users.find(u => u.id === action.payload);
            if (user && user._count) {
                user._count.cases += 1;
            } else if (user) {
                user._count = { cases: 1 };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamData.fulfilled, (state, action) => {
                state.users = action.payload as User[]
            })
            .addCase(addUserThunk.fulfilled, (state, action) => {
                const newUser = action.payload as User;
                state.users.push(newUser);
            })
    }
})

export const { setUsers, updateUserInfo, incrementUserCaseCount } = usersSlice.actions;
export default usersSlice.reducer;