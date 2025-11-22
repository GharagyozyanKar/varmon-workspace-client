import { useEffect } from "react";
import { Outlet } from "react-router";
import { getUsers } from "../../../api/user";
import { useAppDispatch } from "../../../store/hooks";
import type { User } from "../../../types";
import { setUsers } from "../../../store/slices/users.slice";

const AdminWrapper = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        getUsers()
            .then(res => {
                dispatch(setUsers(res.payload as User[]))
            })
    }, [])
    
    return <Outlet />
};
export default AdminWrapper