import { useEffect, useState } from 'react';
import type { IFilters } from '../types';
import type { User } from '../../../../types';
import { useAppDispatch } from '../../../../store/hooks';
import { getArchiveCasesThunk, getUserArchiveCasesThunk } from '../../../../store/thunks/cases.thunk';
import type { AnyAction } from '@reduxjs/toolkit';

interface IProps {
    filters: IFilters;
    user: User;
}

const useArchiveCases = ({ filters, user }: IProps) => {
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);

    useEffect(() => {
        fetchCases(1);
    }, [filters.search, filters.startDate, filters.endDate, filters.assignEmployeeId]);

    const fetchCases = async (pageNumber: number = 1) => {
        if (moreLoading) return;

        else setMoreLoading(true);

        try {
            const thunk =
                user.role === 'admin'
                    ? getArchiveCasesThunk({
                          page: pageNumber,
                          limit: 10,
                          search: filters.search?.trim(),
                          startDate: filters.startDate,
                          endDate: filters.endDate,
                          assignEmployeeId: filters.assignEmployeeId,
                      })
                    : getUserArchiveCasesThunk({
                          userId: user.id,
                          config: {
                              page: pageNumber,
                              limit: 10,
                              search: filters.search?.trim(),
                              startDate: filters.startDate,
                              endDate: filters.endDate,
                          },
                      }) as unknown as AnyAction

            const res = await dispatch(thunk).unwrap();

            if (res) {
                const { cases: newCases, total } = res;
                setHasMore(newCases.length === 10 && newCases.length < total);
                setPage(pageNumber + 1);
            }
        } catch (err) {
            console.error('Error fetching cases:', err);
            setHasMore(false);
        } finally {
            setMoreLoading(false);
        }
    };

    const loadMoreCases = () => {
        if (hasMore) fetchCases(page);
    };

    return {
        hasMore,
        moreLoading,
        loadMoreCases,
    };
};

export default useArchiveCases;