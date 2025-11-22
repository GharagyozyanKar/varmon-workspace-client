import { TableSkeleton } from '../../components'
import styles from './styles.module.scss'
import type { Case } from '../../types'
import CaseItem from './components/CaseItem'

interface IProps {
    cases: Case[],
    loading: boolean,
    mode?: 'default' | 'archive'
}

const CasesTable = ({ cases, loading, mode = 'default' }: IProps) => {
    return (
        <>
            {
                loading ? (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Մուտք</th>
                                    <th>Մուտքի №</th>
                                    <th>Քաղ․ գործի №</th>
                                    <th>Հետազոտվող հասցե</th>
                                    <th>Մակագրում</th>
                                    <th>Կարգավիճակ</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableSkeleton rows={5} columns={7} cellHeight={40} />
                            </tbody>
                        </table>
                    </div>
                ) : cases.length > 0 ? (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Մուտք</th>
                                    <th>Մուտքի №</th>
                                    <th>Քաղ․ գործի №</th>
                                    <th>Հետազոտվող հասցե</th>
                                    <th>Մակագրում</th>
                                    <th>Կարգավիճակ</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases.map((caseItem, i) => (
                                    <tr key={i}>
                                        <CaseItem caseItem={caseItem} mode={mode}/>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={styles.no_cases}>
                        <p>Գործեր չկան</p>
                    </div>
                )}

        </>
    )
}

export default CasesTable