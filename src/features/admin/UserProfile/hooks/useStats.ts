import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getUserStatsThunk } from "../../../../store/thunks/profile.thunks";


interface IProps {
    userId: number | string;
}

const useStats = ({userId}: IProps) => {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.profile.stats);

    useEffect(() => {
        const thunk = dispatch(getUserStatsThunk(userId))
        return () => thunk.abort();
    }, [dispatch, userId])
    
    return { data, loading };
}

export default useStats;