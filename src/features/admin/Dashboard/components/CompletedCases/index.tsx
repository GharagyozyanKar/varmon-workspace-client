import styles from './styles.module.scss';
import CaseItem from './components/CastItem';
import { useAppSelector } from '../../../../../store/hooks';
import { HeaderSkeleton, ListSkeleton } from '../../../../../components';

const CompletedCases = () => {
    const completedCases = useAppSelector(state => state.dashboard.completedCases)
    const loading = useAppSelector(state => state.dashboard.loading)

    return (
        <div className={`${styles.wrapper} box`}>
            <div className={styles.content}>
                <div className={styles.header}>
                    {loading ? (
                        <HeaderSkeleton width={180} height={30} />
                    ) : (
                        <span className="title">Ավարտված գործեր</span>
                    )}
                </div>

                <div className={styles.cases}>
                    {loading ? (
                        <ListSkeleton count={3} height={50} />
                    ) : (
                        completedCases.map(caseItem => (
                            <CaseItem key={caseItem.id} caseItem={caseItem} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompletedCases;
