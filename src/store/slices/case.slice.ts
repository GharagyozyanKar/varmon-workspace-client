import { createSlice } from "@reduxjs/toolkit";
import type { ICaseState } from "../types";
import type { Case, IArchiveCasesPayload } from "../../types";
import { sortCases } from "../../helpers/sorters";
import {
    addCaseThunk,
    changeCaseStatusThunk,
    deleteCaseThunk,
    getArchiveCasesThunk,
    getCurrentCasesThunk,
    getUserArchiveCasesThunk,
    getUserCasesThunk,
    setAssignmentThunk
} from "../thunks/cases.thunk";
import type { Role } from "../../types";




const initialState: ICaseState = {
    cases: {
        data: [],
        loading: false,
    },
    archiveCases: {
        data: [],
        loading: false,
    },
    workspace: {
        data: {
            currentCases: [],
            waitingCases: []
        },
        loading: false
    }
}

const caseSlice = createSlice({
    name: "case",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // Current cases (admin)
            .addCase(getCurrentCasesThunk.pending, (state) => {
                if (state.cases.data.length > 0) return;
                state.cases.loading = true;
            })
            .addCase(getCurrentCasesThunk.fulfilled, (state, action) => {
                if (!action.payload) return;
                state.cases.data = sortCases(action.payload as Case[], "status");
                state.cases.loading = false;
            })

            // Archive (admin)
            .addCase(getArchiveCasesThunk.pending, (state, action) => {
                const { page } = action.meta.arg;
                state.archiveCases.loading = page === 1 ? true : state.archiveCases.loading;
            })
            .addCase(getArchiveCasesThunk.fulfilled, (state, action) => {
                if (!action.payload) return;
                const { cases } = action.payload as IArchiveCasesPayload;
                const { page } = action.meta.arg as { page: number };
                state.archiveCases.data = sortCases(page === 1 ? cases : [...state.archiveCases.data, ...cases]);
                state.archiveCases.loading = false;
            })

            // Current cases (user)
            .addCase(getUserCasesThunk.pending, (state) => {
                if (state.workspace.data.currentCases.length > 0
                    || state.workspace.data.waitingCases.length > 0)
                    return;
                state.workspace.loading = true;
            })
            .addCase(getUserCasesThunk.fulfilled, (state, action) => {
                const {currentCases, waitingCases} = action.payload as {currentCases: Case[], waitingCases: Case[]};

                state.workspace.data.currentCases = sortCases(currentCases, "status");
                state.workspace.data.waitingCases = sortCases(waitingCases);
                state.workspace.loading = false;
            })

            // Archive (user)
            .addCase(getUserArchiveCasesThunk.pending, (state) => {
                state.archiveCases.loading = true;
            })
            .addCase(getUserArchiveCasesThunk.fulfilled, (state, action) => {
                if (!action.payload) return;
                const { cases } = action.payload as IArchiveCasesPayload;
                const { page } = action.meta.arg.config as { page: number };
                state.archiveCases.data = sortCases(page === 1 ? cases : [...state.archiveCases.data, ...cases]);
                state.archiveCases.loading = false;
            })
            .addCase(deleteCaseThunk.fulfilled, (state, action) => {
                const { caseId, mode } = action.payload;
                if (mode === 'default') {
                    state.cases.data = state.cases.data.filter(item => item.id !== caseId);
                } else {
                    state.archiveCases.data = state.archiveCases.data.filter(item => item.id !== caseId);
                }
            })
            .addCase(addCaseThunk.fulfilled, (state, action) => {
                const newCase = action.payload as Case;
                state.cases.data.push(newCase);
                state.cases.data = sortCases(state.cases.data, "status")
            })

            // Change status
            .addCase(changeCaseStatusThunk.fulfilled, (state, action) => {
                const { case: updatedCase, userRole } = action.payload as { case: Case; userRole: Role };



                if (userRole === 'admin') {
                    if (updatedCase.status !== 'closed' && updatedCase.status !== 'canceled') {
                        state.cases.data = sortCases(state.cases.data.map(c =>
                            c.id === updatedCase.id ? { ...c, status: updatedCase.status } : c
                        ), "status");
                    } else {
                        state.cases.data = state.cases.data.filter(c => c.id !== updatedCase.id);
                        state.archiveCases.data.push(updatedCase);
                    }
                } else {
                    state.workspace.data.waitingCases = state.workspace.data.waitingCases.filter(
                        c => c.id !== updatedCase.id
                    );
                    state.workspace.data.currentCases = state.workspace.data.currentCases.filter(
                        c => c.id !== updatedCase.id
                    );

                    // Add to correct workspace
                    if (updatedCase.status === 'waiting') {
                        state.workspace.data.waitingCases.push(updatedCase);
                    } else {
                        state.workspace.data.currentCases.push(updatedCase);
                        state.workspace.data.currentCases = sortCases(state.workspace.data.currentCases, "status");
                    }
                }
                // Remove from both workspaces



                // // Update admin cases list
                // if (updatedCase.status !== 'closed' && updatedCase.status !== 'canceled') {
                //   state.cases.data = sortCases(
                //     state.cases.data.map(c =>
                //       c.id === updatedCase.id ? { ...c, status: updatedCase.status } : c
                //     ),
                //     "status"
                //   );
                // } else {

                //   // Move to archive
                //   console.log(state.cases.data);
                //   state.cases.data = sortCases(
                //     state.cases.data.filter(c => c.id !== updatedCase.id),
                //     "status"
                //   );
                //   console.log(state.cases.data, "after" );

                //     if (!state.archiveCases.data.some(c => c.id === updatedCase.id)) {
                //     state.archiveCases.data.push(updatedCase);
                //   }
                // }
            })
            .addCase(setAssignmentThunk.fulfilled, (state, action) => {
                const updatedCase = action.payload as Case;
                const index = state.cases.data.findIndex(c => c.id === updatedCase.id);
                if (index !== -1) {
                    state.cases.data[index] = updatedCase;
                }
            })
    }
})

export default caseSlice.reducer;