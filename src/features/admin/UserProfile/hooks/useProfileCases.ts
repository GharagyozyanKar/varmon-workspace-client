import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getUserProfileCasesThunk } from "../../../../store/thunks/profile.thunks";

interface IProps {
    userId: number | string;
}

const useProfileCases = ({userId}: IProps) => {
    const dispatch = useAppDispatch();
    const { data: currentCases, loading: currentCasesLoading } = useAppSelector((state) => state.profile.currentCases);
    const { data: lastFiveClosedCases, loading: lastFiveClosedCasesLoading } = useAppSelector((state) => state.profile.lastFiveClosedCases);

    useEffect(() => {
        const thunk = dispatch(getUserProfileCasesThunk(userId))
        return () => thunk.abort();
    }, [dispatch, userId])

    return { currentCases, currentCasesLoading, lastFiveClosedCases, lastFiveClosedCasesLoading };
}

export default useProfileCases;