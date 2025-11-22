import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getUserYearlyCasesCountThunk } from "../../../../store/thunks/profile.thunks";

interface IProps {
    userId: number | string;
}

const useYearlyCasesChart = ({userId}: IProps) => {
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.profile.yearlyCasesChart);

    useEffect(() => {
        const thunk = dispatch(getUserYearlyCasesCountThunk(userId))
        return () => thunk.abort();
    }, [dispatch, userId])

    return { data, loading };
}

export default useYearlyCasesChart;