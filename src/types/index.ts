export interface IResponse {
  status: string,
  message: string,
  payload: unknown,
  code?: string
}
export interface ILoginData {
  email: string,
  password: string
}
export interface IActivationData {
  email: string,
  password: string,
  confirmPassword: string
}
export interface IResetPasswordData {
  password: string,
  confirmPassword: string
}
export interface NewUserData {
  first_name: string
  last_name: string
  email: string
}

export interface IMenuItem {
  label: string
  icon: unknown
  href: string
}

export interface IStats {
  doneYear: number | string,
  doneMonth: number | string,
  inProgress?: number | string,
  waiting?: number | string,
}

export interface IYearlyData {
  month: number | string 
  profit?: number
  cases?: number
}

export interface IArchiveFilterConfig {
  page: number,
  limit: number,
  search: string,
  startDate: string,
  endDate: string,
  assignEmployeeId?: number | null
}


export interface IArchiveCasesPayload {
  cases: Case[],
  total: number,
}

export interface IUserCases {
  currentCases: Case[]
  lastFiveClosedCases: Case[]
}

//--------------------------------------------------------------------------------------


export type Role = "admin" | "user";
export type CaseStatus = "waiting" | "in_progress" | "completed" | "closed" | "canceled";
export type UserStatus = "active" | "inactive";
export type PaymentType = "cash" | "transfer" | "court" | "for_free";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  role: Role;
  email?: string;
  status?: UserStatus;
  password?: string;
  created_at?: string;
  cases?: Case[];
  notes?: Note[];
  files?: File[];
  _count?: { cases: number };
}

export interface Case {
  id: number;
  entryDate: string | Date;
  entryNumber: string;          // Մուտքի Համար
  caseNumber: string;           // Քաղ․ գործի համար
  judge: string;                // Դատավոր
  plaintiff: string;            // Հայցվոր
  defendant: string;            // Պատասխանող
  investigatedAddress: string;  // Հետազոտվող հասցե
  propertyType: string;         // Գույքի տեսակ
  caseType: string;             // Գործի տեսակ
  price: number;
  status: CaseStatus;
  assigned_employee_id?: number | null;      // Մակագրում
  assignedEmployee?: User;
  created_at?: string;
  payment_type?: PaymentType;
  isPaid?: boolean
  notes?: Note[];
  expenditures?: Expenditure[];
  files?: File[];
  closed_at?: string
}

export interface Expenditure {
  id: number;
  case_id: number;
  description: string;
  amount: number | string;
  created_at: string;
  case?: Case;
}
export interface Note {
  id: number;
  case_id: number;
  title: string;
  description: string;
  created_at: string;
  case?: Case;
}


export interface FileInfo {
  id: number;
  case_id: number;
  filename: string;
  uploaded_at: string;
  file_url: string;
  caseNumber: string;
  case?: Case;
}
