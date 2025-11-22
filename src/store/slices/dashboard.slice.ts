import { createSlice } from "@reduxjs/toolkit";
import type { IDashboardState } from "../types";
import type { Case, IYearlyData } from "../../types";
import { convertYearlyDataToDisplay } from "../../helpers/transformFieldValue";
import { getDashboardDataThunk,setCasePaidThunk, setCaseStatusClosedThunk } from "../thunks/dashboard.thunk";




const initialState: IDashboardState = {
    stats: null,
    completedCases: [],
    unpaidCases: [],
    yearlyProfitChart: [],
    yearlyCasesChart: [],
    loading: true
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardDataThunk.fulfilled, (state, action) => {
                const payload = action.payload;

                if (!payload) {
                    state.loading = false;
                    return;
                }

                const {
                    stats = {},
                    completedCases = [],
                    unpaidCases = [],
                    yearlyProfitChart = [],
                    yearlyCasesChart = []
                } = payload;

                const formatMonth = (item: IYearlyData) => ({
                    ...item,
                    month: convertYearlyDataToDisplay(item.month as number),
                });

                const yearlyProfitChartToDisplay = yearlyProfitChart.map(formatMonth);
                const yearlyCasesChartToDisplay = yearlyCasesChart.map(formatMonth);

                Object.assign(state, {
                    stats,
                    completedCases,
                    unpaidCases,
                    yearlyProfitChart: yearlyProfitChartToDisplay,
                    yearlyCasesChart: yearlyCasesChartToDisplay,
                    loading: false,
                });
            })
            .addCase(setCasePaidThunk.fulfilled, (state, action) => {
                const updatedCase = action.payload as Case;

                state.unpaidCases = state.unpaidCases.filter(item => item.id !== updatedCase.id);
                const index = state.completedCases.findIndex(item => item.id === updatedCase.id);
                if (index !== -1) {
                    state.completedCases[index] = updatedCase;
                }
            }) 
            .addCase(setCaseStatusClosedThunk.fulfilled, (state, action) => {
                const updatedCase = action.payload as Case;
                state.completedCases = state.completedCases.filter(item => item.id !== updatedCase.id);

                state.stats = {
                    ...state.stats,
                    doneYear: Number(state.stats?.doneYear) + 1,
                    doneMonth: Number(state.stats?.doneMonth) + 1,
                }
            })
    }
})

// export const {  } = dashboardSlice.actions;
export default dashboardSlice.reducer;