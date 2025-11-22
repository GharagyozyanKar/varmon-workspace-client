import type { Case, CaseStatus } from "../types";



const caseStatusMap: Record<CaseStatus, string> = {
    "in_progress": "Ընթացքի մեջ",
    "completed": "Ավարտված",
    "waiting": "Սպասման մեջ",
    "closed": "Փակված",
    "canceled": "Չեղարկված",
}

const armenianMonthsShort = ["Հնվ", "Փտվ", "Մար", "Ապր", "Մայ", "Հնս", "Հլս", "Օգս", "Սեպ", "Հոկ", "Նոյ", "Դեկ"];

const formatDateForInput = (isoString: string | Date) => {
    if (!isoString) return "";
    const d = typeof isoString === "string" ? new Date(isoString) : isoString;
    return d.toISOString().slice(0, 10);
};



export const transformValue = (field: keyof Case, value: string) => {
    switch (field) {
        case "entryDate":
            return formatDateForInput(value);
        case "closed_at":
            return formatDateForInput(value);
        case "status":
            return caseStatusMap[value as CaseStatus];    
        default:
            return value;
    }
}



export const convertYearlyDataToDisplay = (i: number) => {
    return armenianMonthsShort[i]
}
