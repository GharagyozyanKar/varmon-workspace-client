import type { Case } from "../../../../../types";
import CaseItem from "./components/CaseItem";
import styles from "./styles.module.scss";
import { HeaderSkeleton, ListSkeleton } from "../../../../../components";

interface IProps {
    cases: Case[]
    loading: boolean
}

const CurrentCases = ({cases, loading}: IProps) => {

    return (
        <div className={`${styles.cases} box`}>
            <div className={styles.header}>
                {loading ? (
                    <HeaderSkeleton width={180} height={30} />
                ) : (
                    <span className="title">Կցված գործեր</span>
                )}
            </div>
            <div className={styles.cases_current}>
                {loading ? (
                    <ListSkeleton count={3} height={50} />
                ) : (
                    cases?.map((caseItem) => (
                        <CaseItem key={caseItem.id} caseItem={caseItem} />
                    ))
                )}
            </div>
        </div>
    )
}

export default CurrentCases;
