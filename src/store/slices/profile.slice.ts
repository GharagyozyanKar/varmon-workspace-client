import { createSlice } from "@reduxjs/toolkit";
import type { IUserProfileState } from "../types";
import { getUserByIdThunk, getUserProfileCasesThunk, getUserStatsThunk, getUserYearlyCasesCountThunk } from "../thunks/profile.thunks";
import type { Case, IStats, IYearlyData, User } from "../../types";
import { sortCases } from "../../helpers/sorters";
import { changeCaseStatusThunk } from "../thunks/cases.thunk";


const initialState: IUserProfileState = {
    user: {
        data: null,
        loading: true
    },
    stats: {
        data: null,
        loading: true
    },
    yearlyCasesChart: {
        data: [],
        loading: true
    },
    currentCases: {
        data: [],
        loading: true
    },
    lastFiveClosedCases: {
        data: [],   
        loading: true
    }
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserByIdThunk.fulfilled, (state, action) => {
                state.user = {
                    data: action.payload as User,
                    loading: false
                };
            })
            .addCase(getUserStatsThunk.fulfilled, (state, action) => {
                state.stats = {
                    data: action.payload as IStats,
                    loading: false
                };
            })
            .addCase(getUserYearlyCasesCountThunk.fulfilled, (state, action) => {
                state.yearlyCasesChart = {
                    data: action.payload as IYearlyData[],
                    loading: false
                };
            })
            .addCase(getUserProfileCasesThunk.fulfilled, (state, action) => {
                const { 
                    currentCases, 
                    lastFiveClosedCases 
                } = action.payload as { currentCases: Case[], lastFiveClosedCases: Case[] };

                state.currentCases.data = sortCases(currentCases, 'status');
                state.lastFiveClosedCases.data = sortCases(lastFiveClosedCases);
                state.currentCases.loading = false;
                state.lastFiveClosedCases.loading = false;
            })
            .addCase(changeCaseStatusThunk.fulfilled, (state, action) => {
                const { case: filteredCase } = action.payload;

                const current = state.currentCases.data.filter(item => item.id !== filteredCase.id);
                const closed  = state.lastFiveClosedCases.data.filter(item => item.id !== filteredCase.id);

                if (filteredCase.status === 'canceled' || filteredCase.status === 'closed') {
                    closed.push(filteredCase);
                    state.lastFiveClosedCases.data = sortCases(closed, "status");
                    state.currentCases.data = current;
                } else {
                    current.push(filteredCase);
                    state.currentCases.data = sortCases(current, "status");
                    state.lastFiveClosedCases.data = closed;
                }
            })
    }
})

// export const {  } = profileSlice.actions;
export default profileSlice.reducer;