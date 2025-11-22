import { CasesTable } from '../../../components'
import styles from './styles.module.scss'
import Button from '@mui/material/Button'
import { customOutlinedButtonSx } from '../../../styles/customSx'
import SearchField from './components/SearchField'
import { useState } from 'react'
import useArchiveCases from './hooks/useArchiveCases'
import type { IFilters } from './types'
import DateSearch from './components/DateSearch'
import { useAppSelector } from '../../../store/hooks'
import type { User } from '../../../types'
import AssignEmployeeSelect from './components/AssignedEmployeeSelect'
import { useParams } from 'react-router'

const Archive = () => {
    const user = useAppSelector(state => state.auth.user);
    const { data: archiveCases, loading } = useAppSelector(state => state.case.archiveCases);
    const { id } = useParams();
    const userId = Number(id);

    const [filters, setFilters] = useState<IFilters>({
        search: '',
        startDate: '',
        endDate: '',
        assignEmployeeId: userId ? userId : null
    })
    const { hasMore, loadMoreCases, moreLoading } = useArchiveCases({ filters, user: user as User })

    const handleSearch = (value: string) => {
        setFilters(prev => ({ ...prev, search: value }))
    };

    const handleDateChange = (newRange: { startDate?: string; endDate?: string }) => {
        setFilters(prev => ({ ...prev, ...newRange }))
    }

    const handleSelect = (value: number) => {
        setFilters(prev => ({ ...prev, assignEmployeeId: value || null }))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={`${styles.header} box`}>
                    <SearchField handleSearch={handleSearch} />
                    {user?.role === 'admin' && <AssignEmployeeSelect handleSelect={handleSelect} userId={userId} />}
                    <DateSearch handleDateChange={handleDateChange} />
                </div>

                <div className={`${styles.cases} box`}>
                    <CasesTable cases={archiveCases} loading={loading} mode="archive" />
                    {hasMore && (
                        <div className={styles.loadMoreWrapper}>
                            <Button
                                onClick={loadMoreCases}
                                variant="outlined"
                                sx={customOutlinedButtonSx}
                                className={styles.loadMoreBtn}
                                loading={loading || moreLoading}
                            >
                                Ավելին
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Archive