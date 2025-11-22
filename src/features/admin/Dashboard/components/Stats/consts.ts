import { MdFactCheck, MdWork, MdWorkHistory } from "react-icons/md";
import { TbCalendarMonth } from "react-icons/tb";
import type { IStats } from "../../../../../types";

export interface StatConfig {
  key: keyof IStats;
  icon: React.ComponentType; 
  label?: string;
  desc: string;
}

export const statsConfig: StatConfig[] = [
  {
    key: "doneYear",
    icon: MdFactCheck,
    label: "Տարի",
    desc: "Փակված գործեր",
  },
  {
    key: "doneMonth",    
    icon: TbCalendarMonth,
    label: "Ամիս",
    desc: "Փակված գործեր",
  },
  {
    key: "inProgress",
    icon: MdWork,
    desc: "Ընթացքի մեջ",
  },
  {
    key: "waiting",
    icon: MdWorkHistory,
    desc: "Սպասման մեջ"
  },
];
