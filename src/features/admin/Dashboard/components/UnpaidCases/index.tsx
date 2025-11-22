import CaseItem from './components/CaseItem';
import styles from './styles.module.scss';
import { useAppSelector } from '../../../../../store/hooks';
import { HeaderSkeleton, ListSkeleton } from '../../../../../components';

const UnpaidCases = () => {
    const unpaidCases = useAppSelector(state => state.dashboard.unpaidCases)
    const loading = useAppSelector(state => state.dashboard.loading)

    return (
        <div className={`${styles.wrapper} box`}>
            <div className={styles.content}>
                <div className={styles.header}>
                    {loading ? (
                        <HeaderSkeleton width={150} height={30} />
                    ) : (
                        <span className="title">Չվճարված գործեր</span>
                    )}
                </div>
                <div className={styles.cases}>
                    {loading ? (
                        <ListSkeleton count={3} height={50} />
                    ) : (
                        unpaidCases.length > 0 ?
                            unpaidCases.map((caseItem) => (
                                <CaseItem key={caseItem.id} caseItem={caseItem} />
                            )) : (
                                <div className={styles.no_cases}>
                                    <span>Չվճարված գործեր չկան</span>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
};

export default UnpaidCases;
