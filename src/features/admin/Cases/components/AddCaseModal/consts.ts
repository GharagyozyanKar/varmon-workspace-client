import type { Case } from "../../../../../types"

export const INITIAL_JOB_DATA: Partial<Case> = {
  entryDate: new Date().toISOString().split('T')[0],
  entryNumber: "",
  caseNumber: "",
  judge: "",
  plaintiff: "",
  defendant: "",
  investigatedAddress: "",
  propertyType: "",
  caseType: "",
  assigned_employee_id: null,
  price: 0,
  status: "waiting",
  payment_type: "transfer",
  isPaid: false,

};


export const REQUIRED_FIELDS: (keyof Case)[] = ["entryNumber"];
