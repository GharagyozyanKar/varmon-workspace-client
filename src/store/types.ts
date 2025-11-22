import type { Case, IStats, IYearlyData, User } from "../types";

interface IStateWithLoading<T> {
    data: T,
    loading: boolean
}
export interface IAuthState {
    user: User | null
}

export interface ICaseState {
    cases: IStateWithLoading<Case[]>
    archiveCases: IStateWithLoading<Case[]>
    workspace: IStateWithLoading<IWorkspaceState>
}

export interface IUserState {
    users: User[]
}

export interface IUserProfileState {
    user: IStateWithLoading<User | null>;
    stats: IStateWithLoading<IStats | null>;
    yearlyCasesChart: IStateWithLoading<IYearlyData[]>;
    currentCases: IStateWithLoading<Case[]>;
    lastFiveClosedCases: IStateWithLoading<Case[]>;
}

export interface IArchiveState {
    cases: IStateWithLoading<Case[]>
}

export interface IDashboardState {
    stats: IStats | null;
    completedCases: Case[];
    unpaidCases: Case[];
    yearlyProfitChart: IYearlyData[];
    yearlyCasesChart: IYearlyData[];
    loading?: boolean;
}

export interface IProfileState {
    stats: IStats | null;
    yearlyCasesChart: IYearlyData[];
}

export interface IWorkspaceState {
    currentCases: Case[];
    waitingCases: Case[];
}