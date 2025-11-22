import { IoHome } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { GoProjectRoadmap } from "react-icons/go";
import { IoIosArchive } from "react-icons/io";
import type { IMenuItem } from "../../types";

export const ADMIN_MENU: IMenuItem[] = [
    {
        label: "Գլխավոր էջ",
        href: "/admin",
        icon: <IoHome />
    },
    {
        label: "Աշխատակազմ",
        href: "/admin/team",
        icon: <RiTeamFill />
    },
    {
        label: "Գործեր",
        href: "/admin/cases",
        icon: <GoProjectRoadmap />
    },
    {
        label: "Արխիվ",
        href: "/admin/archive",
        icon: <IoIosArchive />
    }
]

export const USER_MENU: IMenuItem[] = [
    {
        label: "Աշխատանքային տարածք",
        href: "/user/workspace",
        icon: <GoProjectRoadmap />
    },
    {
        label: "Պրոֆիլ",
        href: "/user",
        icon: <IoHome />
    },
    {
        label: "Արխիվ",
        href: "/user/archive",
        icon: <IoIosArchive />
    }
]
