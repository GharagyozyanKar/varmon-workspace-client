import { IoDocumentTextOutline } from 'react-icons/io5';
import { useAppSelector } from '../../../../../store/hooks';
import styles from './styles.module.scss'
import { transformValue } from '../../../../../helpers/transformFieldValue';
import { useNavigate } from 'react-router';
import { CaseItemSkeleton } from '../../../../../components/Skeletons';
import { StatusButton } from '../../../../../components';


const CurrentCases = () => {
  const navigate = useNavigate()
  const cases = useAppSelector(state => state.case.workspace.data.currentCases);
  const loading = useAppSelector(state => state.case.workspace.loading);
  
  return (
    <div className={`${styles.wrapper} box`}>
      <div className={styles.header}>
        <span className={`${styles.title} title`}>Ընթացիկ գործեր</span>
      </div>
      <div className={styles.cases}>
        {loading ? (
          <CaseItemSkeleton count={3} />
        ) : cases.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyText}>Ընթացիկ գործեր չկան</span>
          </div>
        ) : (
          cases.map(item => (
            <div className={styles.caseItem} key={item.id}>
              <div className={styles.header}>
                <span className={styles.title}>{item.entryNumber}</span>
                <StatusButton 
                  caseId={item.id} 
                  value={item.status} 
                />
              </div>
              <div className={styles.icon_wrapper}>
                <IoDocumentTextOutline className={styles.icon} onClick={() => navigate(`/case/${item.id}`)}/>
              </div>
              <div className={styles.footer}>
                <div className={styles.info}>
                  <span>Մուտք:</span>
                  <span>{transformValue("entryDate", String(item.entryDate))}</span>
                </div>
                <div className={styles.info}>
                  <span>Քաղ․ գործ:</span>
                  <span>{transformValue("caseNumber", item.caseNumber)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CurrentCases