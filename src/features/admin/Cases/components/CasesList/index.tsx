
import styles from './styles.module.scss'
import { useAppSelector } from '../../../../../store/hooks'
import { CasesTable } from '../../../../../components'

const CasesList = () => {
    const cases = useAppSelector((state) => state.case.cases.data)
    const loading = useAppSelector((state) => state.case.cases.loading)
    // console.log("render")
    // console.log(cases, "cases");

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <CasesTable cases={cases} loading={loading} />
            </div>
        </div>
    )
}

export default CasesList
