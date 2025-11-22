import { useEffect, useState } from 'react'
import { Info, Stats, YearlyCasesChart } from '../../../components'
import { useAppSelector } from '../../../store/hooks'
import type { IStats, User } from '../../../types'
import ChangePassword from './components/ChangePassword'
import styles from './styles.module.scss'
import type { IProfileState } from '../../../store/types'
import { getProfileData } from '../../../api/mainPage'

const Profile = () => {
    const user = useAppSelector((state) => state.auth.user)
    const [data, setData] = useState<IProfileState>({
        stats: null,
        yearlyCasesChart: [],
    })
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await getProfileData(user?.id as number | string, controller.signal);
                const { stats, yearlyCasesChart } = res.payload as IProfileState
                setData({
                    stats: stats ?? null,
                    yearlyCasesChart: yearlyCasesChart ?? []
                })
            } catch (err: any) {
                if (err.name === "CanceledError" || err.name === 'AbortError') {
                    return;
                }
            }
            setLoading(false);
        }

        fetchData();
        return () => controller.abort();
    }, [])

    return (
        <>
            {
                user && (
                    <>
                        <div className={styles.wrapper}>
                            <ChangePassword/>
                            <Info user={user as User} />
                            <Stats stats={data.stats as IStats} loading={loading} />
                            <YearlyCasesChart 
                                yearlyCasesCount={data.yearlyCasesChart} 
                                loading={loading}
                            />
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Profile
