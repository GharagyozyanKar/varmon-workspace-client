import type { Case, CaseStatus } from "../types";

export const sortCases = (cases: Case[], sortBy: 'status' | 'entryDate' = 'entryDate') => {
    const order: Record<CaseStatus, number> = {
        in_progress: 1,
        completed: 2,
        waiting: 3,
        closed: 4,
        canceled: 5
    };
    return [...cases].sort((a, b) => {
        if (sortBy === 'status') {
            const statusDiff = order[a.status] - order[b.status];
            if (statusDiff !== 0) return statusDiff;
        }
        return new Date(b.entryDate).getTime() -
            new Date(a.entryDate).getTime();
    });
};