import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState } from "../types";
import type { User } from "../../types";


const initialState: IAuthState = {
    user: null
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser(state,action:PayloadAction<User | null>){
            state.user = action.payload
        },
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;