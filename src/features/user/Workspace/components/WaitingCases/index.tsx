import styles from './styles.module.scss'
import CaseItem from '../CaseItem'
import { useAppSelector } from '../../../../../store/hooks'
import { ListSkeleton } from '../../../../../components'

const WaitingCases = () => {
  const cases = useAppSelector(state => state.case.workspace.data.waitingCases);
  const loading = useAppSelector(state => state.case.workspace.loading);

  return (
    <div className={`${styles.wrapper} box`}>
      <div className={styles.header}>
        <span className={"title"}>Կցված գործեր</span>
      </div>
      <div className={styles.cases}>
        {loading ? (
          <ListSkeleton count={3} />
        ) : cases.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyText}>Ընթացիկ գործեր չկան</span>
          </div>
        ) : (
          cases.length > 0 ?
            cases.map(item => (
              <CaseItem key={item.id} caseItem={item} />
            )) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyText}>Կցված գործեր չկան</span>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default WaitingCases