import { useParams } from 'react-router';
import styles from './styles.module.scss'
import { Info, Stats, YearlyCasesChart } from '../../../components';
import { useStats, useUser, useYearlyCasesChart } from './hooks';
import useProfileCases from './hooks/useProfileCases';
import { CurrentCases, LastFiveClosedCases } from './components';

const UserProfile = () => {
    const { id } = useParams();
    const userId = Number(id);
    const { data: userData } = useUser({ userId });
    const { data: statsData, loading: statsLoading } = useStats({ userId });
    const { data: yearlyCasesChartData, loading: yearlyCasesChartLoading } = useYearlyCasesChart({ userId });
    const { currentCases, currentCasesLoading, lastFiveClosedCases, lastFiveClosedCasesLoading } = useProfileCases({ userId });
    
    return (
        <div className={styles.wrapper}>
            <Info user={userData}/>
            <Stats stats={statsData} loading={statsLoading}/>
            <YearlyCasesChart yearlyCasesCount={yearlyCasesChartData} loading={yearlyCasesChartLoading}/>
            <CurrentCases cases={currentCases} loading={currentCasesLoading} />
            <LastFiveClosedCases 
                cases={lastFiveClosedCases}
                loading={lastFiveClosedCasesLoading}
                userId={userId}
            />
        </div>
    )
}

export default UserProfile;