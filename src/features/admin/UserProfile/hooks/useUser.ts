import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getUserByIdThunk } from "../../../../store/thunks/profile.thunks";

interface IProps {
    userId: number | string;
}

const useUser = ({userId}: IProps) => {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.profile.user);

    useEffect(() => {
        const thunk = dispatch(getUserByIdThunk(userId))
        return () => thunk.abort();
    }, [dispatch, userId])
    return { data, loading };
}

export default useUser;